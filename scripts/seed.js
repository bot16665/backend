require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const shoesData = [
  {
    name: 'Nike Air Max Dn8',
    category: 'Lifestyle',
    price: '17,495.00',
    image: '/image/buy/Nike Air Max Dn8.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Air Max Dn8.png',
      '/image/thum/Nike Air Max Dn8 1.png',
      '/image/thum/Nike Air Max Dn8 2.png',
      '/image/thum/Nike Air Max Dn8 3.png',
      '/image/thum/Nike Air Max Dn8 4.png',
      '/image/thum/Nike Air Max Dn8 5.png',
    ]
  },
  // Add all other shoes data here...
  {
    id: 2, name: 'Nike C1TY',
    category: 'Lifestyle',
    price: '8,964.00',
    image: '/image/buy/Nike C1TY.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/Nike C1TY.png',
      '/image/thum/Nike C1Ty 1.png',
      '/image/thum/Nike C1Ty 2.png',
      '/image/thum/Nike C1Ty 3.png',
      '/image/thum/Nike C1Ty 4.png',
      '/image/thum/Nike C1Ty 5.png',
    ],

  },
  {
    id: 3, name: 'Nike Air More Uptempo', category: 'Lifestyle', price: '8,495.00', image: '/image/buy/Nike Air More Uptempo.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Air More Uptempo.png',
      '/image/thum/Nike Air More Uptempo 1.png',
      '/image/thum/Nike Air More Uptempo 2.png',
      '/image/thum/Nike Air More Uptempo 3.png',
      '/image/thum/Nike Air More Uptempo 4.png',
      '/image/thum/Nike Air More Uptempo 5.png',
    ],

  },
  {
    id: 4, name: 'Nike Calm', category: 'Lifestyle', price: '5,000.00', image: '/image/buy/Nike Calm.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Calm.png',
      '/image/thum/Nike Calm 1.png',
      '/image/thum/Nike Calm  2.png',
      '/image/thum/Nike Calm 3.png',
      '/image/thum/Nike Calm 4.png',
      '/image/thum/Nike Calm 5.jpeg',
    ],

  },
  {
    id: 5, name: 'Tatum 3 PF', category: 'Lifestyle', price: '17,964.00', image: '/image/buy/Tatum 3 PF.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Tatum 3 PF.png',
      '/image/thum/Tatum 3 PF 1.png',
      '/image/thum/Tatum 3 PF 2.png',
      '/image/thum/Tatum 3 PF 3.png',
      '/image/thum/Tatum 3 PF 4.png',
      '/image/thum/Tatum 3 PF 5.png',
    ],

  },
  {
    id: 6, name: 'Nike ACG Moc', category: 'Lifestyle', price: '8,495.00', image: '/image/buy/Nike ACG Moc.jpeg', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike ACG Moc.jpeg',
      '/image/thum/Nike ACG Moc 1.png',
      '/image/thum/Nike ACG Moc 2.jpeg',
      '/image/thum/Nike ACG Moc 3.jpeg',
      '/image/thum/Nike ACG Moc 4.jpeg',
      '/image/thum/Nike ACG Moc 5.jpeg',
    ],

  },
  {
    id: 7, name: 'Nike Air Max Plus Premium', category: 'Lifestyle', price: '7,495.00', image: '/image/buy/Nike Air Max Plus Premium.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Air Max Plus Premium.png',
      '/image/thum/Nike Air Max Plus Premium 1.png',
      '/image/thum/Nike Air Max Plus Premium 2.png',
      '/image/thum/Nike Air Max Plus Premium 3.png',
      '/image/thum/Nike Air Max Plus Premium 4.png',
      '/image/thum/Nike Air Max Plus Premium 5.jpeg',
    ],

  },
  {
    id: 8, name: 'Luka 3 PF', category: 'Lifestyle', price: '9,964.00', image: '/image/buy/Luka 3 PF.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Luka 3 PF.png',
      '/image/thum/Luka 3 PF 1.png',
      '/image/thum/Luka 3 PF 2.jpeg',
      '/image/thum/Luka 3 PF 3.png',
      '/image/thum/Luka 3 PF 4.png',
      '/image/thum/Luka 3 PF 5.png',
    ],

  },
  {
    id: 9, name: 'Nike Pegasus 41', category: 'Lifestyle', price: '4,000.00', image: '/image/buy/Nike Pegasus 41.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Pegasus 41.png',
      '/image/thum/Nike Pegasus 41 1.png',
      '/image/thum/Nike Pegasus 41 2.png',
      '/image/thum/Nike Pegasus 41 3.png',
      '/image/thum/Nike Pegasus 41 4.png',
      '/image/thum/Nike Pegasus 41 5.png',
    ],
  },
  // Jordan Shoes
  {
    id: 10, name: 'Air Jordan 4 RM', category: 'Jordan', price: '12,795.00', image: '/image/buy/Air Jordan 4 RM.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Air Jordan 4 RM.png',
      '/image/thum/Air Jordan 4 RM 1.png',
      '/image/thum/Air Jordan 4 RM 2.png',
      '/image/thum/Air Jordan 4 RM 3.png',
      '/image/thum/Air Jordan 4 RM 4.png',
      '/image/thum/Air Jordan 4 RM 5.png',
    ],
  },
  {
    id: 11, name: 'Air Jordan 3 Retro Luck Shorts', category: 'Jordan', price: '19,950.00', image: '/image/buy/Air Jordan 3 Retro Luck Shorts.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Air Jordan 3 Retro Luck Shorts.png',
      '/image/thum/Air Jordan 3 Retro Luck Shorts 1.png',
      '/image/thum/Air Jordan 3 Retro Luck Shorts 2.png',
      '/image/thum/Air Jordan 3 Retro Luck Shorts 3.png',
      '/image/thum/Air Jordan 3 Retro Luck Shorts 4.png',
      '/image/thum/Air Jordan 3 Retro Luck Shorts 5.png',
    ],

  },
  {
    id: 12, name: 'Air Jordan 4 Retro Industrial Blue', category: 'Jordan', price: '19,495.00', image: '/image/buy/Air Jordan 4 Retro Industrial Blue.jpeg', gender: 'Men',
    thumbnails: [
      '/image/buy/Air Jordan 4 Retro Industrial Blue.jpeg',
      '/image/thum/Air Jordan 4 Retro Industrial Blue 1.png',
      '/image/thum/Air Jordan 4 Retro Industrial Blue 2.jpeg',
      '/image/thum/Air Jordan 4 Retro Industrial Blue 3.png',
      '/image/thum/Air Jordan 4 Retro Industrial Blue 4.jpeg',
      '/image/thum/Air Jordan 4 Retro Industrial Blue 5.png',
    ],

  },
  {
    id: 13, name: 'Air Jordan I High G', category: 'Jordan', price: '16,995.00', image: '/image/buy/Air Jordan I High G.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Air Jordan I High G.png',
      '/image/thum/Air Jordan I High G 1.png',
      '/image/thum/Air Jordan I High G 2.png',
      '/image/thum/Air Jordan I High G 3.png',
      '/image/thum/Air Jordan I High G 4.png',
      '/image/thum/Air Jordan I High G 5.png',
    ],

  },
  {
    id: 14, name: 'Air Jordan 1 Retro High OG Midnight Navy', category: 'Jordan', price: '16,995.00', image: '/image/buy/Air Jordan 1 Retro High OG Midnight Navy.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Air Jordan 1 Retro High OG Midnight Navy.png',
      '/image/thum/Air Jordan 1 Retro High OG Midnight Navy 1.png',
      '/image/thum/Air Jordan 1 Retro High OG Midnight Navy 2.png',
      '/image/thum/Air Jordan 1 Retro High OG Midnight Navy 3.png',
      '/image/thum/Air Jordan 1 Retro High OG Midnight Navy 4.png',
      '/image/thum/Air Jordan 1 Retro High OG Midnight Navy 5.png',
    ],

  },
  {
    id: 15, name: 'Air Jordan 9 G', category: 'Lifestyle', price: '16,495.00', image: '/image/buy/Air Jordan 9 G.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Air Jordan 9 G.png',
      '/image/thum/Air Jordan 9 G 1.png',
      '/image/thum/Air Jordan 9 G 2.png',
      '/image/thum/Air Jordan 9 G 3.png',
      '/image/thum/Air Jordan 9 G 4.png',
      '/image/thum/Air Jordan 9 G 5.png',
    ],


  },
  {
    id: 16, name: 'Air Jordan 1 Mid', category: 'Jordan', price: '11,495.00', image: '/image/buy/Air Jordan 1 Mid.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Air Jordan 1 Mid.png',
      '/image/thum/Air Jordan 1 Mid 1.png',
      '/image/thum/Air Jordan 1 Mid 2.png',
      '/image/thum/Air Jordan 1 Mid 3.png',
      '/image/thum/Air Jordan 1 Mid 4.png',
      '/image/thum/Air Jordan 1 Mid 5.png',
    ],

  },
  {
    id: 17, name: 'Jordan Max Aura 6', category: 'Jordan', price: '11,297.00', image: '/image/buy/Jordan Max Aura 6.jpeg', gender: 'Men',
    thumbnails: [
      '/image/buy/Jordan Max Aura 6.jpeg',
      '/image/thum/Jordan Max Aura 6 1.png',
      '/image/thum/Jordan Max Aura 6 2.png',
      '/image/thum/Jordan Max Aura 6 3.png',
      '/image/thum/Jordan Max Aura 6 4.png',
      '/image/thum/Jordan Max Aura 6 5.png',
    ],

  },
  {
    id: 18, name: 'Air Jordan Dub Zero', category: 'Jordan', price: '14,257.00', image: '/image/buy/Air Jordan Dub Zero.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Air Jordan Dub Zero.png',
      '/image/thum/Air Jordan Dub Zero 1.png',
      '/image/thum/Air Jordan Dub Zero 2.png',
      '/image/thum/Air Jordan Dub Zero 3.png',
      '/image/thum/Air Jordan Dub Zero 4.png',
      '/image/thum/Air Jordan Dub Zero 5.jpeg',
    ],

  },
  // Running Shoes
  {
    id: 19, name: 'Nike Pegasus Premium', category: 'Running', price: '19,295.00', image: '/image/buy/Nike Pegasus Premium.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Pegasus Premium.png',
      '/image/thum/Nike Pegasus Premium 1.png',
      '/image/thum/Nike Pegasus Premium 2.png',
      '/image/thum/Nike Pegasus Premium 3.png',
      '/image/thum/Nike Pegasus Premium 4.png',
      '/image/thum/Nike Pegasus Premium 5.png',
    ],


  },
  {
    id: 20, name: 'Nike Vomero 18', category: 'Running', price: '13,295.00', image: '/image/buy/Nike Vomero 18.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Vomero 18.png',
      '/image/thum/Nike Vomero 18 1.png',
      '/image/thum/Nike Vomero 18 2.png',
      '/image/thum/Nike Vomero 18 3.png',
      '/image/thum/Nike Vomero 18 4.png',
      '/image/thum/Nike Vomero 18 5.png',
    ],

  },
  {
    id: 21, name: 'Nike Pegasus 41', category: 'Running', price: '14,000.00', image: '/image/buy/Nike Pegasus 41.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Pegasus 41.png',
      '/image/thum/Nike Pegasus 41 1.png',
      '/image/thum/Nike Pegasus 41 2.png',
      '/image/thum/Nike Pegasus 41 3.png',
      '/image/thum/Nike Pegasus 41 4.png',
      '/image/thum/Nike Pegasus 41 5.png',
    ],

  },
  {
    id: 22, name: 'Nike Pegasus Plus', category: 'Running', price: '16,995.00', image: '/image/buy/Nike Pegasus Plus.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Pegasus Plus.png',
      '/image/thum/Nike Pegasus Plus 1.png',
      '/image/thum/Nike Pegasus Plus 2.png',
      '/image/thum/Nike Pegasus Plus 3.png',
      '/image/thum/Nike Pegasus Plus 4.png',
      '/image/thum/Nike Pegasus Plus 5.png',
    ],

  },
  {
    id: 23, name: 'Nike Alphafly 3 Premium', category: 'Running', price: '23,795.00', image: '/image/buy/Nike Alphafly 3 Premium.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Alphafly 3 Premium.png',
      '/image/thum/Nike Alphafly 3 Premium 1.png',
      '/image/thum/Nike Alphafly 3 Premium 2.png',
      '/image/thum/Nike Alphafly 3 Premium 3.png',
      '/image/thum/Nike Alphafly 3 Premium 4.png',
      '/image/thum/Nike Alphafly 3 Premium 5.png',
    ],

  },
  {
    id: 24, name: 'Nike Zoom Fly 6', category: 'Running', price: '15,995.00', image: '/image/buy/Nike Zoom Fly 6.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Zoom Fly 6.png',
      '/image/thum/Nike Zoom Fly 6 1.png',
      '/image/thum/Nike Zoom Fly 6 2.png',
      '/image/thum/Nike Zoom Fly 6 3.png',
      '/image/thum/Nike Zoom Fly 6 4.png',
      '/image/thum/Nike Zoom Fly 6 5.png',
    ],

  },
  {
    id: 25, name: 'Nike Ultrafly', category: 'Running', price: '21,695.00', image: '/image/buy/Nike Ultrafly.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Ultrafly.png',
      '/image/thum/Nike Ultrafly 1.png',
      '/image/thum/Nike Ultrafly 2.png',
      '/image/thum/Nike Ultrafly 3.png',
      '/image/thum/Nike Ultrafly 4.png',
      '/image/thum/Nike Ultrafly 5.png',
    ],

  },
  {
    id: 26, name: 'Nike Downshifter 13', category: 'Running', price: '8,295.00', image: '/image/buy/Nike Downshifter 13.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Downshifter 13.png',
      '/image/thum/Nike Downshifter 13 1.png',
      '/image/thum/Nike Downshifter 13 2.png',
      '/image/thum/Nike Downshifter 13 3.png',
      '/image/thum/Nike Downshifter 13 4.png',
      '/image/thum/Nike Downshifter 13 5.png',
    ],

  },
  {
    id: 27, name: 'Nike Juniper Trail 2', category: 'Running', price: '7,000.00', image: '/image/buy/Nike Juniper Trail 2.jpeg', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Juniper Trail 2.jpeg',
      '/image/thum/Nike Juniper Trail 2 1.png',
      '/image/thum/Nike Juniper Trail 2 2.jpeg',
      '/image/thum/Nike Juniper Trail 2 3.jpeg',
      '/image/thum/Nike Juniper Trail 2 4.png',
      '/image/thum/Nike Juniper Trail 2 5.jpeg',
    ],
    //football shoes
  },

  {
    id: 28, name: 'Nike Mercurial Vapor 1 RGN SE', category: 'Football', price: '26,795.00', image: '/image/buy/Nike Mercurial Vapor 1 RGN SE.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Mercurial Vapor 1 RGN SE.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 1.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 2.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 3.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 4.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 5.png',
    ],


  },
  {
    id: 29, name: 'Nike Mercurial Superfly 10 Elite AS', category: 'Football', price: '25,000.00', image: '/image/buy/Nike Mercurial Superfly 10 Elite AS.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Mercurial Superfly 10 Elite AS.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 1.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 2.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 3.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 4.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 5.png',
    ],

  },
  {
    id: 30, name: 'Nike Mercurial Vapor 16 Club', category: 'Football', price: '5,000.00', image: '/image/buy/Nike Mercurial Vapor 16 Club.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Mercurial Vapor 16 Club.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 1.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 2.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 3.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 4.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 5.png',
    ],

  },
  {
    id: 31, name: 'Nike Phantom Luna 2 Academy', category: 'Football', price: '9,000.00', image: '/image/buy/Nike Phantom Luna 2 Academy.jpeg', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Phantom Luna 2 Academy.jpeg',
      '/image/thum/Nike Phantom Luna 2 Academy 1.png',
      '/image/thum/Nike Phantom Luna 2 Academy 2.png',
      '/image/thum/Nike Phantom Luna 2 Academy 3.png',
      '/image/thum/Nike Phantom Luna 2 Academy 4.png',
      '/image/thum/Nike Phantom Luna 2 Academy 5.jpeg',
    ],

  },
  {
    id: 32, name: 'Nike Mercurial Vapor 16 Academy Kylian Mbappe', category: 'Football', price: '8,799.00', image: '/image/buy/Nike Mercurial Vapor 16 Academy Kylian Mbappe.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Mercurial Vapor 16 Academy Kylian Mbappe.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 1.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 2.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 3.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 4.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 5.png',
    ],

  },
  {
    id: 33, name: 'Nike Phantom GX 2 Elite', category: 'Football', price: '21,999.00', image: '/image/buy/Nike Phantom GX 2 Elite.jpeg', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Phantom GX 2 Elite.jpeg',
      '/image/thum/Nike Phantom GX 2 Elite 1.png',
      '/image/thum/Nike Phantom GX 2 Elite 2.png',
      '/image/thum/Nike Phantom GX 2 Elite 3.png',
      '/image/thum/Nike Phantom GX 2 Elite 4.png',
      '/image/thum/Nike Phantom GX 2 Elite 5.png',
    ],

  },
  {
    id: 34, name: 'Nike United Phantom Luna 2 Elite', category: 'Football', price: '25,095.00', image: '/image/buy/Nike United Phantom Luna 2 Elite.png', gender: 'Men',
    thumbnails: [
      '/image/buy/Nike United Phantom Luna 2 Elite.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 1.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 2.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 3.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 4.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 5.png',
    ],

  },
  {
    id: 35, name: 'Nike Phantom GX 2 Academy Erling Haaland',
    category: 'Football',
    price: '8,495.00',
    image: '/image/buy/Nike Phantom GX 2 Academy Erling Haaland.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/Nike Phantom GX 2 Academy Erling Haaland.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 1.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 2.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 3.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 4.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 5.png',
    ],
  },

  //basketball shoes
  {
    id: 36, name: 'Tatum 3 PF',
    category: 'Basketball',
    price: '11,495.00',
    image: '/image/buy/Tatum 3 PF.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/Tatum 3 PF.png',
      '/image/thum/Tatum 3 PF 1.png',
      '/image/thum/Tatum 3 PF 2.png',
      '/image/thum/Tatum 3 PF 3.png',
      '/image/thum/Tatum 3 PF 4.png',
      '/image/thum/Tatum 3 PF 5.png',
    ],
  },

  {
    id: 37, name: 'KD17 EP',
    category: 'Basketball',
    price: '6,495.00',
    image: '/image/buy/KD17 EP.jpeg',
    gender: 'Men',
    thumbnails: [
      '/image/buy/KD17 EP.jpeg',
      '/image/thum/KD17 EP 1.png',
      '/image/thum/KD17 EP 2.jpeg',
      '/image/thum/KD17 EP 3.png',
      '/image/thum/KD17 EP 4.jpeg',
      '/image/thum/KD17 EP 5.png',
    ],
  },

  {
    id: 38, name: 'Luka 3 PF',
    category: 'Basketball',
    price: '11,495.00',
    image: '/image/buy/Luka 3 PF.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/Luka 3 PF.png',
      '/image/thum/Luka 3 PF 1.png',
      '/image/thum/Luka 3 PF 2.jpeg',
      '/image/thum/Luka 3 PF 3.png',
      '/image/thum/Luka 3 PF 4.png',
      '/image/thum/Luka 3 PF 5.png',
    ],
  },


  {
    id: 39, name: 'Giannis Freak 6 Candy Funhonse Ep',
    category: 'Basketball',
    price: '12,795.00',
    image: '/image/buy/Giannis Freak 6 Candy Funhonse Ep.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/Giannis Freak 6 Candy Funhonse Ep.png',
      '/image/thum/Giannis Freak 6 Candy Funhonse Ep 1.png',
      '/image/thum/Giannis Freak 6 Candy Funhonse Ep 2.png',
      '/image/thum/Giannis Freak 6 Candy Funhonse Ep 3.png',
      '/image/thum/Giannis Freak 6 Candy Funhonse Ep 4.png',
      '/image/thum/Giannis Freak 6 Candy Funhonse Ep 5.png',
    ],

  },

  {
    id: 40, name: 'Giannis Immortality 4 EP',
    category: 'Basketball',
    price: '7,905.00',
    image: '/image/buy/Giannis Immortality 4 EP.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/Giannis Immortality 4 EP.png',
      '/image/thum/Giannis Immortality 4 EP 1.png',
      '/image/thum/Giannis Immortality 4 EP 2.png',
      '/image/thum/Giannis Immortality 4 EP 3.png',
      '/image/thum/Giannis Immortality 4 EP 4.png',
      '/image/thum/Giannis Immortality 4 EP 5.png',
    ],
  },

  {
    id: 41, name: 'LeBron NXXT Genisus EP',
    category: 'Basketball',
    price: '8,495.00',
    image: '/image/buy/LeBron NXXT Genisus EP.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/LeBron NXXT Genisus EP.png',
      '/image/thum/LeBron NXXT Genisus EP 1.png',
      '/image/thum/LeBron NXXT Genisus EP 2.png',
      '/image/thum/LeBron NXXT Genisus EP 3.png',
      '/image/thum/LeBron NXXT Genisus EP 4.png',
      '/image/thum/LeBron NXXT Genisus EP 5.png',
    ],
  },

  {
    id: 42, name: 'LeBron Witness VIII EP',
    category: 'Basketball',
    price: '5,495.00',
    image: '/image/buy/LeBron Witness VIII EP.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/LeBron Witness VIII EP.png',
      '/image/thum/LeBron Witness VIII EP 1.png',
      '/image/thum/LeBron Witness VIII EP 2.png',
      '/image/thum/LeBron Witness VIII EP 3.png',
      '/image/thum/LeBron Witness VIII EP 4.png',
      '/image/thum/LeBron Witness VIII EP 5.png',
    ],
  },

  {
    id: 43, name: 'Zion 4 PF',
    category: 'Basketball',
    price: '12,495.00',
    image: '/image/buy/Zion 4 PF.png',
    gender: 'Men',
    thumbnails: [
      '/image/buy/Zion 4 PF.png',
      '/image/thum/Zion 4 PF 1.png',
      '/image/thum/Zion 4 PF 2.png',
      '/image/thum/Zion 4 PF 3.png',
      '/image/thum/Zion 4 PF 4.png',
      '/image/thum/Zion 4 PF 5.png',
    ],
  },

  ////////////////////////////////women shoes ///////////////////////////////////////////
  {
    id: 44, name: 'Nike Air Max Dn8', category: 'Lifestyle', price: '17,495.00', image: '/image/buy/woman/Nike Air Max Dn8.png', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike Air Max Dn8.png',
      '/image/thum/Nike Air Max Dn8 1.1.png',
      '/image/thum/Nike Air Max Dn8 2.2.png',
      '/image/thum/Nike Air Max Dn8 3.3.png',
      '/image/thum/Nike Air Max Dn8 4.4.png',
      '/image/thum/Nike Air Max Dn8 5.5.png',
    ],

  },
  {
    id: 45, name: 'Jordan Deja', category: 'Lifestyle', price: '8,964.00', image: '/image/buy/woman/Jordan Deja.jpeg', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Jordan Deja.jpeg',
      '/image/thum/Jordan Deja 1.jpeg',
      '/image/thum/Jordan Deja 2.png',
      '/image/thum/Jordan Deja 3.jpeg',
      '/image/thum/Jordan Deja 4.jpeg',
      '/image/thum/Jordan Deja 5.jpeg',
    ],


  },
  {
    id: 46, name: 'Nike Air More Uptempo', category: 'Lifestyle', price: '8,495.00', image: '/image/buy/Nike Air More Uptempo.png', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike Air More Uptempo.png',
      '/image/thum/Nike Air More Uptempo 1.png',
      '/image/thum/Nike Air More Uptempo 2.png',
      '/image/thum/Nike Air More Uptempo 3.png',
      '/image/thum/Nike Air More Uptempo 4.png',
      '/image/thum/Nike Air More Uptempo 5.png',
    ],

  },
  {
    id: 47, name: 'Nike Calm', category: 'Lifestyle', price: '5,000.00', image: '/image/buy/Nike Calm.png', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike Calm.png',
      '/image/thum/Nike Calm 1.png',
      '/image/thum/Nike Calm 2.png',
      '/image/thum/Nike Calm 3.png',
      '/image/thum/Nike Calm 4.png',
      '/image/thum/Nike Calm 5.png',
    ],

  },
  {
    id: 48, name: 'Jordan Hex Mule', category: 'Lifestyle', price: '17,964.00', image: '/image/buy/Tatum 3 PF.png', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Jordan Hex Mule.png',
      '/image/thum/Jordan Hex Mule 1.png',
      '/image/thum/Jordan Hex Mule 2.png',
      '/image/thum/Jordan Hex Mule 3.png',
      '/image/thum/Jordan Hex Mule 4.png',
      '/image/thum/Jordan Hex Mule 5.png',
    ],

  },

  // Jordan Shoes///////////////


  {
    id: 49, name: 'Air Jordan 1 Brooklyn', category: 'Jordan', price: '15,295.00', image: '/image/buy/woman/Air Jordan 1 Brooklyn.png', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Air Jordan 1 Brooklyn.png',
      '/image/thum/Air Jordan 1 Brooklyn 1.png',
      '/image/thum/Air Jordan 1 Brooklyn 2.png',
      '/image/thum/Air Jordan 1 Brooklyn 3.png',
      '/image/thum/Air Jordan 1 Brooklyn 4.png',
      '/image/thum/Air Jordan 1 Brooklyn 5.png',
    ],

  },
  {
    id: 50, name: 'Air Jordan 4 Net', category: 'Jordan', price: '20,950.00', image: '/image/buy/woman/Air Jordan 4 Net.png', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Air Jordan 4 Net.png',
      '/image/thum/Air Jordan 4 Net 1.png',
      '/image/thum/Air Jordan 4 Net 2.png',
      '/image/thum/Air Jordan 4 Net 3.png',
      '/image/thum/Air Jordan 4 Net 4.png',
      '/image/thum/Air Jordan 4 Net 5.png',
    ],

  },
  {
    id: 51, name: 'Air Jordan 5 Retro Golden Ticket', category: 'Jordan', price: '18,495.00', image: '/image/buy/woman/Air Jordan 5 Retro Golden Ticket.png', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Air Jordan 5 Retro Golden Ticket.png',
      '/image/thum/Air Jordan 5 Retro Golden Ticket 1.png',
      '/image/thum/Air Jordan 5 Retro Golden Ticket 2.png',
      '/image/thum/Air Jordan 5 Retro Golden Ticket 3.png',
      '/image/thum/Air Jordan 5 Retro Golden Ticket 4.png',
      '/image/thum/Air Jordan 5 Retro Golden Ticket 5.png',
    ],

  },
  {
    id: 52, name: 'Air Jordan 1 Low Method of Make', category: 'Jordan', price: '12,295.00', image: '/image/buy/woman/Air Jordan 1 Low Method of Make.png', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Air Jordan 1 Low Method of Make.png',
      '/image/thum/Air Jordan 1 Low Method of Make 1.png',
      '/image/thum/Air Jordan 1 Low Method of Make 2.png',
      '/image/thum/Air Jordan 1 Low Method of Make 3.png',
      '/image/thum/Air Jordan 1 Low Method of Make 4.png',
      '/image/thum/Air Jordan 1 Low Method of Make 5.png',
    ],

  },

  {
    id: 53, name: 'Jordan Stadium 90', category: 'Jordan', price: '4,295.00', image: '/image/buy/woman/Jordan Stadium 90.jpeg', gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Jordan Stadium 90.jpeg',
      '/image/thum/Jordan Stadium 90 1.png',
      '/image/thum/Jordan Stadium 90 2.jpeg',
      '/image/thum/Jordan Stadium 90 3.jpeg',
      '/image/thum/Jordan Stadium 90 4.jpeg',
      '/image/thum/Jordan Stadium 90 5.jpeg',
    ],

  },
  ////running shoes///

  {
    id: 54, name: 'Nike Motiva',
    category: 'Running',
    price: '10,200.00',
    image: '/image/buy/woman/Nike Motiva.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike Motiva.png',
      '/image/thum/Nike Motiva 1.png',
      '/image/thum/Nike Motiva 2.png', 
      '/image/thum/Nike Motiva 3.png',
      '/image/thum/Nike Motiva 4.png',
      '/image/thum/Nike Motiva 5.jpeg',
    ],
  },

  {
    id: 55, name: 'Nike Structure 25',
    category: 'Running',
    price: '2,200.00',
    image: '/image/buy/woman/Nike Structure 25.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike Structure 25.png',
      '/image/thum/Nike Structure 25 1.png',
      '/image/thum/Nike Structure 25 2.png',
      '/image/thum/Nike Structure 25 3.png',
      '/image/thum/Nike Structure 25 4.png',
      '/image/thum/Nike Structure 25 5.png',
    ],
  },
  {
    id: 56, name: 'Nike Interact Run EasyOn SE',
    category: 'Running',
    price: '4,295.00',
    image: '/image/buy/woman/Nike Interact Run EasyOn SE.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike Interact Run EasyOn SE.png',
      '/image/thum/Nike Interact Run EasyOn SE 1.png',
      '/image/thum/Nike Interact Run EasyOn SE 2.png',
      '/image/thum/Nike Interact Run EasyOn SE 3.png',
      '/image/thum/Nike Interact Run EasyOn SE 4.png',
      '/image/thum/Nike Interact Run EasyOn SE 5.png',
    ],
  },
  {
    id: 57, name: 'Nike Pegasus 41 By You',
    category: 'Running',
    price: '14,295.00',
    image: '/image/buy/woman/Nike Pegasus 41 By You.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike Pegasus 41 By You.png',
      '/image/thum/Nike Pegasus 41 By You 1.png',
      '/image/thum/Nike Pegasus 41 By You 2.png',
      '/image/thum/Nike Pegasus 41 By You 3.png',
      '/image/thum/Nike Pegasus 41 By You 4.png',
      '/image/thum/Nike Pegasus 41 By You 5.png',
    ],
  },
  {
    id: 58, name: 'Nike Invincible 3 By You',
    category: 'Running',
    price: '19,500.00',
    image: '/image/buy/woman/Nike Invincible 3 By You.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike Invincible 3 By You.png',
      '/image/thum/Nike Invincible 3 By You 1.png',
      '/image/thum/Nike Invincible 3 By You 2.png',
      '/image/thum/Nike Invincible 3 By You 3.png',
      '/image/thum/Nike Invincible 3 By You 4.png',
      '/image/thum/Nike Invincible 3 By You 5.png',
    ],
  },
  /////////////football/////////
  {
    id: 59, name: 'Nike Mercurial Vapor 1 RGN SE', category: 'Football', price: '26,795.00', image: '/image/buy/Nike Mercurial Vapor 1 RGN SE.png', gender: 'Women',
    thumbnails: [
      '/image/buy/Nike Mercurial Vapor 1 RGN SE.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 1.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 2.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 3.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 4.png',
      '/image/thum/Nike Mercurial Vapor 1 RGN SE 5.png',
    ],


  },
  {
    id: 60, name: 'Nike Mercurial Superfly 10 Elite AS', category: 'Football', price: '25,000.00', image: '/image/buy/Nike Mercurial Superfly 10 Elite AS.png', gender: 'Women',
    thumbnails: [
      '/image/buy/Nike Mercurial Superfly 10 Elite AS.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 1.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 2.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 3.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 4.png',
      '/image/thum/Nike Mercurial Superfly 10 Elite AS 5.png',
    ],

  },
  {
    id: 61, name: 'Nike Mercurial Vapor 16 Club', category: 'Football', price: '5,000.00', image: '/image/buy/Nike Mercurial Vapor 16 Club.png', gender: 'Women',
    thumbnails: [
      '/image/buy/Nike Mercurial Vapor 16 Club.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 1.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 2.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 3.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 4.png',
      '/image/thum/Nike Mercurial Vapor 16 Club 5.png',
    ],

  },
  {
    id: 62, name: 'Nike Phantom Luna 2 Academy', category: 'Football', price: '9,000.00', image: '/image/buy/Nike Phantom Luna 2 Academy.jpeg', gender: 'Women',
    thumbnails: [
      '/image/buy/Nike Phantom Luna 2 Academy.jpeg',
      '/image/thum/Nike Phantom Luna 2 Academy 1.png',
      '/image/thum/Nike Phantom Luna 2 Academy 2.png',
      '/image/thum/Nike Phantom Luna 2 Academy 3.png',
      '/image/thum/Nike Phantom Luna 2 Academy 4.png',
      '/image/thum/Nike Phantom Luna 2 Academy 5.jpeg',
    ],

  },
  {
    id: 63, name: 'Nike Mercurial Vapor 16 Academy Kylian Mbappe', category: 'Football', price: '8,799.00', image: '/image/buy/Nike Mercurial Vapor 16 Academy Kylian Mbappe.png', gender: 'Women',
    thumbnails: [
      '/image/buy/Nike Mercurial Vapor 16 Academy Kylian Mbappe.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 1.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 2.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 3.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 4.png',
      '/image/thum/Nike Mercurial Vapor 16 Academy Kylian Mbappe 5.png',
    ],

  },
  {
    id: 64, name: 'Nike Phantom GX 2 Elite', category: 'Football', price: '21,999.00', image: '/image/buy/Nike Phantom GX 2 Elite.jpeg', gender: 'Women',
    thumbnails: [
      '/image/buy/Nike Phantom GX 2 Elite.jpeg',
      '/image/thum/Nike Phantom GX 2 Elite 1.png',
      '/image/thum/Nike Phantom GX 2 Elite 2.png',
      '/image/thum/Nike Phantom GX 2 Elite 3.png',
      '/image/thum/Nike Phantom GX 2 Elite 4.png',
      '/image/thum/Nike Phantom GX 2 Elite 5.png',
    ],

  },
  {
    id: 65, name: 'Nike United Phantom Luna 2 Elite', category: 'Football', price: '25,095.00', image: '/image/buy/Nike United Phantom Luna 2 Elite.png', gender: 'Women',
    thumbnails: [
      '/image/buy/Nike United Phantom Luna 2 Elite.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 1.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 2.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 3.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 4.png',
      '/image/thum/Nike United Phantom Luna 2 Elite 5.png',
    ],

  },
  {
    id: 66, name: 'Nike Phantom GX 2 Academy Erling Haaland',
    category: 'Football',
    price: '8,495.00',
    image: '/image/buy/Nike Phantom GX 2 Academy Erling Haaland.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/Nike Phantom GX 2 Academy Erling Haaland.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 1.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 2.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 3.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 4.png',
      '/image/thum/Nike Phantom GX 2 Academy Erling Haaland 5.png',
    ],
  },


  ///////////////////////basketball////////////////////////


  {
    id: 67, name: 'JA 2  Heart Eyes EP',
    category: 'Basketball',
    price: '22,200.00',
    image: '/image/buy/woman/JA 2  Heart Eyes EP.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/JA 2  Heart Eyes EP.png',
      '/image/thum/JA 2  Heart Eyes EP 1.png',
      '/image/thum/JA 2  Heart Eyes EP 2.png',
      '/image/thum/JA 2  Heart Eyes EP 3.png',
      '/image/thum/JA 2  Heart Eyes EP 4.png',
      '/image/thum/JA 2  Heart Eyes EP 5.png',
    ],
  },

  {
    id: 68, name: 'Nike GT Cut3 EP',
    category: 'Basketball',
    price: '18,5s00.00',
    image: '/image/buy/woman/Nike GT Cut3 EP.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Nike GT Cut3 EP.png',
      '/image/thum/Nike GT Cut3 EP 1.png',
      '/image/thum/Nike GT Cut3 EP 2.png',
      '/image/thum/Nike GT Cut3 EP 3.png',
      '/image/thum/Nike GT Cut3 EP 4.png',
      '/image/thum/Nike GT Cut3 EP 5.png',
    ],
  },

  {
    id: 69, name: 'Book 1 EP Sunrise',
    category: 'Basketball',
    price: '12,400.00',
    image: '/image/buy/woman/Book 1 EP Sunrise.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Book 1 EP Sunrise.png',
      '/image/thum/Book 1 EP Sunrise 1.png',
      '/image/thum/Book 1 EP Sunrise 2.png',
      '/image/thum/Book 1 EP Sunrise 3.png',
      '/image/thum/Book 1 EP Sunrise 4.png',
      '/image/thum/Book 1 EP Sunrise 5.png',
    ],
  },

  {
    id: 70, name: 'Giannis Freak 5 By You',
    category: 'Basketball',
    price: '22,200.00',
    image: '/image/buy/woman/Giannis Freak 5 By You.png',
    gender: 'Women',
    thumbnails: [
      '/image/buy/woman/Giannis Freak 5 By You.png',
      '/image/thum/Giannis Freak 5 By You 1.png',
      '/image/thum/Giannis Freak 5 By You 2.png',
      '/image/thum/Giannis Freak 5 By You 3.png',
      '/image/thum/Giannis Freak 5 By You 4.png',
      '/image/thum/Giannis Freak 5 By You 5.png',
    ],
  },



];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(shoesData);
    console.log('Added new products');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
