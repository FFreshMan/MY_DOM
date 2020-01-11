//增-------------------------------------------------------------------------------
window.dom = {
  create(string) {
    const container = document.createElement("template");
    //template是一个万能容器他不显示
    container.innerHTML = string.trim();
    //把字符串写入template的html中，trim是防止html前面有空格，作用是清除字符串两边空格
    return container.content.firstChild;
    //因为template.firstChild不能直接得到这个元素，所以用上面这个
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
    //只有前插这个接口，所以要对node的父节点去调用前插函数，把node2插到node后一个节点的前面
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
    //新增一个哥哥
  },
  append(parent, child) {
    parent.appendChild(child);
    //新增一个儿子
  },
  wrap(node, parent) {
    dom.before(node, parent);
    parent.appendChild(node);
    //新增一个爸爸
  },
  //删-------------------------------------------------------------------------------
  remove(node) {
    //   node.remove() 有点新可能不支持
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    // const { childNodes } = node;
    //childNodes=node.childNodes，这是是新语法，node.childNodes本身就是一个数组输出的
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
    console.log(array);
  },
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    }
    if (arguments.length === 2) {
      return node.getAttribute(name);
    }

    //改变一个节点的属性
  },
  text(node, content) {
    //适配
    if (arguments.length === 3) {
      if (innerText in node) {
        node.textContent = content;
      } else {
        node.innerText = content;
      }
    } else if (arguments.length === 2) {
      if (innerText in node) {
        return node.textContent;
      } else {
        return node.innerText;
      }
    }
    //这里是为了兼容ie，ie8不支持textContent
    //直接把内部的所有东西包括其他的标签都覆盖了，如果想单独改某一部分则用单独标签包裹后调用
  },
  html(node, string) {
    if (arguments.length === 3) {
      node.innerHTML = string;
    } else if (arguments.length === 2) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div,"color","red")
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div,"color")想知道color的值
        return node.style[name];
      } else if (name instanceof Object) {
        //想写入一个属性,注意这里Object大写
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  }, //改class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  }, //scope用来指定在哪个标签里找
  parent(node) {
    return node.parentNode;
  }, //父节点
  children(node) {
    return node.children;
  }, //子节点
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node);
  }, //兄弟节点，得到的伪数组转化成数组，然后对其使用filter，把不等于自己的写入数组
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  }, //找到不是文本的下一个节点
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  }, //不是文本的前一个节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  }, //遍历
  index(node) {
    const list = dom.children(node.parentNode);
    for (var i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  }
};
