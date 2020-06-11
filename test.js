const g = {
  prop: 327,
  f: () => this.prop,
};

const o = {
  prop: 37,
  f() {
    return this.prop;
  },
};

console.log(o.f()); // logs 37


console.log(g.f());
