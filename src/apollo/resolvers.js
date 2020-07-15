import {gql} from 'apollo-boost';

const resolvers = {
  Mutation: {
    setAuthLogin: (_, {id, fullName, email}, {cache}) => {
      cache.writeData({
        data: {
          isLogin: true,
          userInfo: {
            id,
            fullName,
            email,
          },
        },
      });

      return null;
    },
    setAuthLogout: (_, args, {cache}) => {
      cache.writeData({data: {isLogin: false}});
      return null;
    },
    openModalMutation: (_, args, {cache}) => {
      cache.writeData({data: {isModalOpen: true}});
      return null;
    },
    closeModalMutation: (_, args, {cache}) => {
      cache.writeData({data: {isModalOpen: false}});
      return null;
    },
    addProductToCart: (_, {id, title, price}, {cache}) => {
      const query = gql`
        query ProductsInCart {
          selectedProducts @client {
            id
            title
            price
          }
        }
      `;

      const previous = cache.readQuery({query});
      const selectedProducts = previous.selectedProducts.concat({
        id,
        title,
        price,
        __typename: 'Product',
      });
      const data = {selectedProducts};

      cache.writeQuery({query, data});
      return null;
    },
  },
};

export default resolvers;
