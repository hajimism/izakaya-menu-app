import menuData from "@/menu.json";

type Category = keyof (typeof menuData)["menu"];
const check = (category: string): category is Category =>
  Object.prototype.hasOwnProperty.call(menuData.menu, category);

function extractMenuTitle() {
  const result: string[] = [];

  Object.keys(menuData.menu).forEach((category) => {
    if (check(category)) {
      result.push(...menuData.menu[category]);
    }
  });

  return result;
}

export const menuTitles = extractMenuTitle();
