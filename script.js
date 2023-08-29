const result = () => {
  const rawCssCode = document.querySelector("#code").value;
  const viewWidth = Number(document.querySelector("#window_width").value);
  // const rawCssCode = `input[type="number"] {
  //   display: flex;
  //   align-items: center;
  //   height: 5rem;
  //   width: 20rem;
  //   padding: 1rem;
  // };`;

  const RegExp = /[0-9](rem|px|cm|em|in)/;
  const editedCssCode = rawCssCode.replace("{", "{\n");
  editedCssCode.replace(";", ";\n");

  const splitedCssCode = editedCssCode.split("\n");
  for (let i = 0; i < splitedCssCode.length; i++) {
    if (
      !RegExp.test(splitedCssCode[i]) &&
      !/{/.test(splitedCssCode[i]) &&
      !/}/.test(splitedCssCode[i])
    ) {
      // splitedCssCode.splice(i, 1);
      delete splitedCssCode[i];
    }
  }
  // fresh css code
  let cssCode = splitedCssCode.join("\n");
  const trimmedCssCode = cssCode.replace(/^\s*[\r\n]/gm, "");
  console.log(trimmedCssCode);

  // numeric values from the css code
  const numericValues = cssCode
    .match(/[\d.]+/g)
    .map((value) => parseFloat(value));

  for (let i = 0; i < numericValues.length; i++) {
    let vw = parseFloat(((numericValues[i] / viewWidth) * 100).toFixed(3));
    cssCode = cssCode.replace(`${numericValues[i]}rem`, `${vw}vw`);
  }

  return cssCode.replace(/^\s*[\r\n]/gm, "");
};

const btnSubmit = document.querySelector("#btn_submit");
btnSubmit.addEventListener("click", () => {
  const output = document.querySelector(".result_section");
  output.innerHTML = result();
});
