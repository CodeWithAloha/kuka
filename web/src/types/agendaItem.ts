import type { Timestamp } from "@firebase/firestore-types";

/**
 * Notes on Legistar and conversion to the internal model.
 *
 * /Events
 *    Hosts agendas. Each "Event" is a calendar item on this page: https://mauicounty.legistar.com/Calendar.aspx
 *
 * /EventItem
 *    Event (hasMany) EventItem
 *    Each item is a topic addressed during a legislative session. For longer sessions it can even hold things
 *    like ROLL CALL, OPENING REMARKs, etc. See:
 *      - https://mauicounty.legistar.com/MeetingDetail.aspx?ID=805256
 *      &GUID=16E8F5B5-F4AD-41BC-8688-CA9A8D7A0037&Options=info%7c&Search=
 *
 *    An EventItem may be attached to a Matter (i.e. Bill or official text). i.e. EventItem.EventItemMatterId = XXX
 *
 *
 * /Matters
 *    EventItem (oneToOne)? Matter
 *    Holds some kind of official text that is typically attached to a bill
 *
 * /Matters/Versions
 *    Matters (hasMany) Versions
 *    Each version is attached to a text, i.e.
 *    GET http://webapi.legistar.com/v1/mauicounty/matters/9845/Versions
 *    [{
 *      "Key": "12290",  // Text ID
 *      "Value": "1"     // incremented for each version
 *    }]
 *
 * /Matters/:MatterId/Texts/:TextId
 *    Matters (manyToMany) Texts (through Versions)
 *    Sometimes this contains the legal text for the bill or excerpt/ Usually the intent of the particular Matter. i.e.
 *    "We recommend we do X", "This is a bill that does Y"
 *
 * /Matters/:MatterId/Attachments
 *    Matter (hasMany) Attachments
 *    For Maui County, most official matters have attachments with all the details, actual legal text, reports, etc.
 *
 *
 */


export interface AgendaAttachment {
  id: number;        // source=MatterAttachmentId
  fileName: string;  // source=MatterAttachmentName
  link: string;      // source=MatterAttachmentHyperlink
  sortKey: number;   // source=MatterAttachmentSort

  // data origin
  _sourceMatterAttachmentId: number;
}

export interface AgendaItem {
  id: string;             // source=EventItemId
  title: string;           // source=EventItemTitle
  agendaType: string;      // source=EventItemMatterType
  agendaFile: string | null;  // source=EventAgendaFile, usually attached to the event
  location: string;        // source=EventLocation
  description: string;     // source=MatterTextPlain
  billCode: string;        // source=MatterFile
  heroImage?: string;      // add some pizzazz for bills we care about.
  attachments: AgendaAttachment[];

  // TODO: maybe use withConverter() so we never have to deal with Timestamps.
  sessionTime: Timestamp;  // source=EventDate + EventTime localized to HST
  isActive: boolean;       // when "EventAgendaStatusId" === 10, "EventAgendaStatusName" === "Final",

  eventUrl: string;        // source=EventInSiteURL

  // Internally managed fields
  // removed createdAt field to make create/updates easier to maintain -- firestore does not
  // have any auto-generated fields and having separate code paths is too high-effort. Updating
  // in a firebase function could be an option.
  // createdAt?: Timestamp;
  updatedAt?: Timestamp;

  // data origins, debugging
  _sourceEventId: number;
  _sourceEventItemId: number;
  _sourceMatterId: number;
  _sourceMatterTextId: number;
}

