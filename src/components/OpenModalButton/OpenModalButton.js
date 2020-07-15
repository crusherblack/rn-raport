import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useMutation} from '@apollo/react-hooks';

import {gql} from 'apollo-boost';

const OPEN_MODAL_MUTATION = gql`
  mutation {
    openModalMutation @client
  }
`;

const OpenModalButton = () => {
  const [openModal, {data}] = useMutation(OPEN_MODAL_MUTATION);

  return (
    <TouchableOpacity
      onPress={() => {
        openModal();
        console.log('oke');
      }}
      title="Open Modal">
      <Text>OPEN MODEL</Text>
    </TouchableOpacity>
  );
};

export default OpenModalButton;
