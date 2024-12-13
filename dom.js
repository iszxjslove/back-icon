const fragment = document.createDocumentFragment();

function createRow(bank) {
  const pinyinDom = document.createElement("div");
  pinyinDom.classList.add("bank-pinyin");
  const titleDom = document.createElement("div");
  titleDom.classList.add("bank-title");

  const bankIconBox = document.createElement("div");
  bankIconBox.classList.add("bank-box");
  const bankIconItem = document.createElement("div");
  bankIconItem.classList.add("bank-item", "bank-item-icon");
  bankIconItem.appendChild(bankIconBox);

  const bankRoundedBox = document.createElement("div");
  bankRoundedBox.classList.add("bank-box");
  const bankRoundedItem = document.createElement("div");
  bankRoundedItem.classList.add("bank-item", "bank-item-rounded");
  bankRoundedItem.appendChild(bankRoundedBox);

  const bankGroupBox = document.createElement("div");
  bankGroupBox.classList.add("bank-box");
  const bankGroupItem = document.createElement("div");
  bankGroupItem.classList.add("bank-item", "bank-item-group");
  bankGroupItem.appendChild(bankGroupBox);

  const bankGroup = document.createElement("div");
  bankGroup.classList.add("bank-group");
  bankGroup.appendChild(bankIconItem);
  bankGroup.appendChild(bankRoundedItem);
  bankGroup.appendChild(bankGroupItem);
  if (bank) {
    pinyinDom.innerText = bank.icon.pinyin;
    titleDom.innerText = bank.icon.name;
    bankGroup.classList.add(`bank-${bank.icon.pinyin}`);
  } else {
    bankGroupItem.classList.add("no-bg");
    bankRoundedItem.classList.add("no-bg");
    bankIconItem.classList.add("no-bg");
  }

  const bankRow = document.createElement("div");
  bankRow.classList.add("bank-row");
  bankRow.appendChild(titleDom);
  bankRow.appendChild(pinyinDom);
  bankRow.appendChild(bankGroup);
  return bankRow;
}
for (let pinyin in BANK_LIST) {
  fragment.appendChild(createRow(BANK_LIST[pinyin]));
}
for (let index = 0; index < 6; index++) {
  fragment.appendChild(createRow());
}
document.getElementById("target-container").appendChild(fragment);
