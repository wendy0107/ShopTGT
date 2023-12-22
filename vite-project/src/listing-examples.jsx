export const listingExamples = [
  {
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
    title: "Test 1",
    owner: "@testing",
    uploadDate: "21 Dec 2023",
  },
  {
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
    title: "Test 1",
    owner: "@testing",
    uploadDate: "21 Dec 2023",
  },
  {
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
    title: "Test 1",
    owner: "@testing",
    uploadDate: "21 Dec 2023",
  },
  {
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
    title: "Test 1",
    owner: "@testing",
    uploadDate: "21 Dec 2023",
  },
  {
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
    title: "Test 1",
    owner: "@testing",
    uploadDate: "21 Dec 2023",
  },
  {
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
    title: "Test 1",
    owner: "@testing",
    uploadDate: "21 Dec 2023",
  },
];

export const listingDetails = {
  id: 2,
  imageUrl:
    "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
  title: "Test 1",
  owner: "@testing",
  uploadDate: "21 Dec 2023",
  // description:
  //  "Poppy poppy poppy poppy"
  description:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  status: 'OPEN', // 'OPEN', 'CLOSED', 'FINALIZED',
  collectionPoint: "16 Redville Street, Conny Island",
  items: [
    {
      id: 1,
      name: "Fresh Strawberries (1 lb)",
      price: 5.99,
      remaining_qty: 5,
      total_qty: 1000,
    },
    {
      id: 2,
      name: "Homemade Apple Pie (6 slices)",
      price: 12.5,
      remaining_qty: 2,
      total_qty: 1000,
    },
    {
      id: 3,
      name: "Organic Whole Wheat Bread Loaf",
      price: 4.25,
      remaining_qty: 3,
      total_qty: 1000,
    },
    {
      id: 4,
      name: "Free-Range Eggs (1 dozen)",
      price: 3.75,
      remaining_qty: 8,
      total_qty: 1000,
    },
  ],
};

export const orderDetails = {
  id: 0,
  listing_id: 2,
  buyer_id: "@testing1",
  orderQuantities: [3, 0, 0, 0],
  finalQuantities: [1, 0, 0, 0], 
  hasCollected: false
};

export const listingOwner = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "123-456-7890",
};
