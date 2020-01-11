console.log("hi");
let div = dom.create("<div>222</div>");
dom.after(test, div);
dom.empty(emm);
dom.attr(emm, "id", "emm1");
let name = dom.attr(test, "id");
console.log(`title:${name}`);
dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "color"));
dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "blue");
console.log(dom.class.has(test, "blue"));
dom.on(test, "click", () => {
  console.log("点了");
});
let div1 = dom.find("#test")[0];
console.log(div1);
console.log(dom.find("#s2"));
console.log(dom.parent(s2));
console.log(dom.children(siblings));
//由于我这里s2是唯一的所以我不用去找到他，如果不唯一则要用find找到他然后取[i]个
// let SS=dom.find("#s2")[0]然后把SS作为参数带入下面
console.log(dom.siblings(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));
console.log(
  dom.each(dom.children(travel), n => {
    dom.style(n, "color", "red");
  })
);
console.log(dom.index(s2));
