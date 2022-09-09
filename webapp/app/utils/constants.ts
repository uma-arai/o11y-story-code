// TODO: 最終的にはDBから取得に置き換える
export const pets = [
  {
    id: "1",
    name: "ミヌエット",
    currency: "JPY",
    price: 360_000,
    flag: "new",
    imageUrl:
      "https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=777&q=80",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "brown",
      },
    ],
  },
  {
    id: "2",
    name: "サイベリアン",
    currency: "JPY",
    price: 500_000,
    salePrice: 400_000,
    flag: "on-sale",
    imageUrl:
      "https://images.unsplash.com/photo-1586289883499-f11d28aaf52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "grey",
      },
    ],
  },
  {
    id: "3",
    name: "マンチカン",
    currency: "JPY",
    price: 240_000,
    imageUrl:
      "https://images.unsplash.com/photo-1606491048802-8342506d6471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "red",
      },
    ],
  },
  {
    id: "4",
    name: "シャム",
    currency: "JPY",
    price: 550_000,
    imageUrl:
      "https://images.unsplash.com/photo-1605450648855-63f9161b7ef7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fGtpdHRlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "white",
      },
    ],
  },
  {
    id: "5",
    name: "Matcha",
    currency: "JPY",
    price: 400_000,
    imageUrl: "https://pbs.twimg.com/media/FaxOK5HUIAANRYo?format=jpg&name=4096x4096",
    description: "よくたべてよく遊ぶ、ほわほわの毛並みのミヌエットです",
    features: ["くりくりの目", "きれいな毛並み", "おてんば"],
    details: [
      { name: "種別", value: "Minuet" },
      {
        name: "毛色",
        value: "Calico",
      },
    ],
  },
  {
    id: "uma-chan",
    name: "uma-chan",
    currency: "JPY",
    price: 66_666_000,
    salePrice: 49_800_000,
    imageUrl:
      "https://images.unsplash.com/photo-1557413606-2a63a06a1f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "white",
      },
    ],
  },
  {
    id: "arai-san",
    name: "arai-san",
    currency: "JPY",
    price: 50_000,
    imageUrl:
      "https://images.unsplash.com/photo-1601247387326-f8bcb5a234d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "white",
      },
    ],
  },
  {
    id: "6",
    name: "ソマリ",
    currency: "JPY",
    price: 550_000,
    imageUrl:
      "https://images.unsplash.com/photo-1597626133663-53df9633b799?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "white",
      },
    ],
  },
  {
    id: "7",
    name: "チンチラ",
    currency: "JPY",
    price: 550_000,
    imageUrl:
      "https://images.unsplash.com/photo-1621238281284-d186cb6813fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGtpdHRlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "white",
      },
    ],
  },
  {
    id: "8",
    name: "ペルシャ",
    currency: "JPY",
    price: 550_000,
    imageUrl:
      "https://images.unsplash.com/photo-1557166984-b00337652c94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGtpdHRlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "white",
      },
    ],
  },
  {
    id: "9",
    name: "スコティッシュフォールド",
    currency: "JPY",
    price: 550_000,
    imageUrl:
      "https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGtpdHRlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "white",
      },
    ],
  },
  {
    id: "10",
    name: "アメリカンショートヘア",
    currency: "JPY",
    price: 550_000,
    imageUrl:
      "https://images.unsplash.com/photo-1582797493098-23d8d0cc6769?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGtpdHRlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "description",
    features: ["cute", "famous", "cool"],
    details: [
      {
        name: "color",
        value: "white",
      },
    ],
  },
]

export const pages: { [key: string]: string } = {
  "/": "トップページ",
  "/pets": "ペット一覧",
  "/pets/[pet_id]": "ペット詳細",
  "/crash": "エラーが出るページ",
}
