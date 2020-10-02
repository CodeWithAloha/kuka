import axios from 'axios';
import { first, max, orderBy, trim } from 'lodash';
import { format } from 'date-fns';
import { AgendaAttachment, AgendaItem } from "../../../web/src/types/agendaItem";
import parseLegistarDateToUtc from "../utils/parseLegistarDateToUtc";
import { firestore } from 'firebase-admin';
import { compareTwoStrings } from 'string-similarity';
import { removeEmptyPages } from "../utils/textUtils";

const LEGISTAR_ROOT = 'https://webapi.legistar.com/v1/mauicounty';



/**
 *
 * @param newerThan return matters updated after this value
 *
 * Event Example
 * {
    "EventId": 2854,
    "EventGuid": "4A509548-A040-4C83-A78D-6A0763C80306",
    "EventLastModifiedUtc": "2020-09-17T00:16:51.51",
    "EventRowVersion": "AAAAAABgiMQ=",
    "EventBodyId": 197,
    "EventBodyName": "Affordable Housing Committee",
    "EventDate": "2020-09-23T00:00:00",
    "EventTime": "1:30 PM",
    "EventVideoStatus": "Public",
    "EventAgendaStatusId": 10,
    "EventAgendaStatusName": "Final",
    "EventMinutesStatusId": 10,
    "EventMinutesStatusName": "Final",
    "EventLocation": "Online Only\r\nPhone testimony: 408-915-6290, meeting code 798 867 277\r\nVideo testimony: https://bluejeans.com/798867277\r\nView live: Akaku, Channel 53 or mauicounty.us/agendas\r\n*Subject to change without notice. Visit mauicounty.us for more\r\ninformation.",
    "EventAgendaFile": "https://mauicounty.legistar1.com/mauicounty/meetings/2020/9/2854_A_Affordable_Housing_Committee_20-09-23_Committee_Agenda.pdf",
    "EventMinutesFile": null,
    "EventAgendaLastPublishedUTC": "2020-09-17T00:16:51.183",
    "EventMinutesLastPublishedUTC": null,
    "EventComment": "Recessed to 09/29/20 at 1:30 p.m.",
    "EventVideoPath": null,
    "EventInSiteURL": "https://mauicounty.legistar.com/MeetingDetail.aspx?LEGID=2854&GID=632&G=E71DEF67-B5BD-48E0-B187-94BEDF37B05F",
    "EventItems": []
   }
 */
export async function getEvents(newerThan: Date): Promise<any[]> {
  console.debug("Retrieving events")
  const resp = await axios.get(`${LEGISTAR_ROOT}/Events`, {
    params: {
      '$filter': `EventLastModifiedUtc ge datetime\'${format(newerThan, 'yyyy-MM-dd')}\' and EventAgendaStatusName eq 'Final'`
    }
  });

  return resp.data;
}

/**
 *
 * @param matterId
 *
 * Matter Example:
 * {
    "MatterId": 9815,
    "MatterGuid": "5386CAEA-3622-4B53-AD75-0B42699EDFFF",
    "MatterLastModifiedUtc": "2020-09-18T23:20:54.497",
    "MatterRowVersion": "AAAAAABgTyk=",
    "MatterFile": "CC 20-464",
    "MatterName": null,
    "MatterTitle": "PROSECUTING ATTORNEY, transmitting a copy of Administrative Directive No. 19-01 and Executive Memorandum No. 20-05 from the State of Hawaii, Department of Budget and Finance, authorizing the County of Maui to be reimbursed for allowable expenses incurred by the witnesses and defendants in criminal proceedings in the amount of $25,000.",
    "MatterTypeId": 63,
    "MatterTypeName": "County Communication",
    "MatterStatusId": 80,
    "MatterStatusName": "Agenda Ready",
    "MatterBodyId": 138,
    "MatterBodyName": "Council of the County of Maui ",
    "MatterIntroDate": "2020-09-10T00:00:00",
    "MatterAgendaDate": "2020-09-25T00:00:00",
    "MatterPassedDate": null,
    "MatterEnactmentDate": null,
    "MatterEnactmentNumber": null,
    "MatterRequester": null,
    "MatterNotes": null,
    "MatterVersion": "1",
    "MatterText1": null,
    "MatterText2": "lauren.saldana@mauicounty.us",
    "MatterText3": null,
    "MatterText4": null,
    "MatterText5": null,
    "MatterDate1": null,
    "MatterDate2": null,
    ...
}
 */
async function getMatter(matterId: number): Promise<any> {
  console.log(`Getting matter: ${matterId}`);
  const resp = await axios.get(`${LEGISTAR_ROOT}/Matters/${matterId}`);
  return resp.data;
}

export async function getMatterAttachments(matterId: number): Promise<AgendaAttachment[]> {
  console.log(`Getting matter attachments: ${matterId}`);
  const resp = await axios.get(`${LEGISTAR_ROOT}/Matters/${matterId}/Attachments`, {
    params: {
      'orderby': 'MatterAttachmentSort'
    }
  });

  return resp.data.map((attachment: any) => ({
    id: attachment.MatterAttachmentId,
    fileName: attachment.MatterAttachmentName,
    link: attachment.MatterAttachmentHyperlink,
    sortKey: attachment.MatterAttachmentSort,
    _sourceMatterAttachmentId: attachment.MatterAttachmentId
  }))
}


/**
 *
 * @param matterId
 *
 * Example Matter Text:
 * {
    "MatterTextId": 12290,
    "MatterTextGuid": "B3C2A818-FF4A-42C9-8CB6-C6636DC491DA",
    "MatterTextLastModifiedUtc": "2020-09-15T21:15:49.67",
    "MatterTextRowVersion": "AAAAAABf90w=",
    "MatterTextMatterId": 9845,
    "MatterTextVersion": "1",
    "MatterTextPlain": "..Title\n\"A BILL FOR AN ORDINANCE AMENDING THE FISCAL YEAR 2021 ...",
    "MatterTextRtf": "..."
}
 */
async function getMatterText(matterId: number): Promise<any> {
  console.log(`Getting MatterText: ${matterId}`);
  const versions = await axios.get(`${LEGISTAR_ROOT}/Matters/${matterId}/Versions`);
  const highestVersion = first(
    orderBy(versions.data, ['Value'], ['desc'])
  )

  const matterText = await axios.get(`${LEGISTAR_ROOT}/Matters/${matterId}/Texts/${highestVersion.Key}`);
  return matterText.data;
}

/**
 *
 * @param eventId legistar event id
 *
 * {
      "EventItemId": 54630,
      "EventItemGuid": "6C0ECB45-19A4-4A63-97C5-45BAF126CB29",
      "EventItemLastModifiedUtc": "2020-09-19T01:15:09.31",
      "EventItemRowVersion": "AAAAAABgTQo=",
      "EventItemEventId": 2937,
      "EventItemAgendaSequence": 13,
      "EventItemMinutesSequence": 13,
      "EventItemAgendaNumber": null,
      "EventItemVideo": null,
      "EventItemVideoIndex": null,
      "EventItemVersion": "1",
      "EventItemAgendaNote": null,
      "EventItemMinutesNote": null,
      "EventItemActionId": null,
      "EventItemActionName": null,
      "EventItemActionText": null,
      "EventItemPassedFlag": null,
      "EventItemPassedFlagName": null,
      "EventItemRollCallFlag": 0,
      "EventItemFlagExtra": 0,
      "EventItemTitle": "PROSECUTING ATTORNEY, transmitting a copy of Administrative Directive No. 19-01 and Executive Memorandum No. 20-05 from the State of Hawaii, Department of Budget and Finance, authorizing the County of Maui to be reimbursed for allowable expenses incurred by the witnesses and defendants in criminal proceedings in the amount of $25,000.",
      "EventItemTally": null,
      "EventItemAccelaRecordId": null,
      "EventItemConsent": 0,
      "EventItemMoverId": null,
      "EventItemMover": null,
      "EventItemSeconderId": null,
      "EventItemSeconder": null,
      "EventItemMatterId": 9815,
      "EventItemMatterGuid": "5386CAEA-3622-4B53-AD75-0B42699EDFFF",
      "EventItemMatterFile": "CC 20-464",
      "EventItemMatterName": null,
      "EventItemMatterType": "County Communication",
      "EventItemMatterStatus": "Agenda Ready",
      "EventItemMatterAttachments": []
    }
 */
// @ts-ignore
export async function getEventItems(eventId: number): Promise<any[]> {
  const url = `${LEGISTAR_ROOT}/Events/${eventId}/EventItems`
  // console.log(url)
  const resp = await axios.get(url, {
    params: {
      '$filter': 'EventItemMatterId ne null'
    }
  })

  return resp.data;
}

export async function eventItemToAgenda(event: any, eventItem: any): Promise<AgendaItem> {
  const eventTime = parseLegistarDateToUtc(event.EventDate, event.EventTime);
  const matter = await getMatter(eventItem.EventItemMatterId);
  const matterText = await getMatterText(eventItem.EventItemMatterId);
  let attachments = await getMatterAttachments(eventItem.EventItemMatterId);

  const title = trim(eventItem.EventItemTitle, '"');

  // Maui County event titles are often cut+pasted into the description
  // Check for string similarity, if title and matter text are similar, set description to an empty string.
  let description = matterText.MatterTextPlain;
  if (compareTwoStrings(title, description) > 0.8) {
    description = '';
  }
  description = removeEmptyPages(description);

  // skip all testimony attachments
  attachments = attachments.filter((attachment) => {
    const words = attachment.fileName.toLowerCase().split(' ');
    const numbers = words.map((word) => compareTwoStrings(word, 'testimony'))

    // filter out all filenames with the word "Testimony", handles typos which occasionally happen.
    // @ts-ignore
    return !(max(numbers) > 0.52)
  })

  return {
    id: eventItem.EventItemId.toString(),
    title,
    agendaType: eventItem.EventItemMatterType,
    agendaFile: event.EventAgendaFile,
    location: event.EventLocation,

    description,
    billCode: matter.MatterFile,
    eventUrl: event.EventInSiteURL,
    sessionTime: firestore.Timestamp.fromDate(eventTime),

    attachments,
    isActive: true,

    _sourceEventId: event.EventId,
    _sourceEventItemId: eventItem.EventItemId,
    _sourceMatterId: eventItem.EventItemMatterId,
    _sourceMatterTextId: matterText.MatterTextId
  }
}
