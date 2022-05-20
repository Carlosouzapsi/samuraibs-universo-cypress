
import dashPage  from "../support/pages/dash";

import {costumer, provider, appointment} from "../support/factories/dash"

describe("dashboard", function () {
  context("quando o cliente faz um agendamento no app mobile", function () {


    before(function () {
      cy.postUser(provider);
      cy.postUser(costumer);

      cy.apiLogin(costumer);
      cy.setProviderId(provider.email);
      cy.createAppointment(appointment.hour);
    });

    it("o mesmo deve ser exibido no dashboard", function () {
      const day = Cypress.env('appointmentDay')
      // loginPage.go();
      // loginPage.form(provider);
      // loginPage.submit();

      //cy.uiLogin(provider)
      cy.apiLogin(provider, true);

      dashPage.calendarShouldBeVisible();      
      dashPage.selectDay(day);
      dashPage.appointmentShouldBe(costumer, appointment.hour);

    });
  });
});

