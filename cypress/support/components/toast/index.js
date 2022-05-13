import { el } from "./elements";

class Toast {
  shouldHaveText(expectText) {
    cy.get(el.toast, { timeout: 100000 })
      .should("be.visible")
      .find("p")
      .should("have.text", expectText);
  }
}

export default new Toast();
