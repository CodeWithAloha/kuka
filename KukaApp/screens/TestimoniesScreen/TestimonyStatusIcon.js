import React from 'react';
import ThumbsUp from '../../assets/images/thumbsup.svg';
import MessageCircle from '../../assets/images/message-circle.svg';
import { View } from 'react-native';

const states = {
  Approve: {
    Component: ThumbsUp,
    borderColor: '#3A7714',
    backgroundColor: '#3A771412',
  },
  Disapprove: {
    Component: ThumbsUp,
    borderColor: '#BF2B15',
    backgroundColor: '#BF2B1512',
    transform: [{ scaleY: -1 }],
  },
  Comment: {
    Component: MessageCircle,
    borderColor: '#0089A8',
  },
};

/**
 * TestimonyStatusIcon
 * @param userPosition: 'APPROVE', 'DISAPPROVE', 'COMMENT'
 * @returns {JSX.Element}
 * @constructor
 */
const TestimonyStatusIcon = ({ userPosition }) => {
  const iconConfig = states[userPosition];
  const { Component, ...styles } = iconConfig;

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 6,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        ...styles,
      }}
    >
      <Component width={13} fill={styles.borderColor} />
    </View>
  );
};

export default TestimonyStatusIcon;
