import {el} from './elements'
import header from '../../components/header'

class DashPage {

    constructor(){
        this.header = header;
    }

    calendarShouldBeVisible(){
        cy.get(el.calendar, {timeout: 7000})
          .should('be.visible')
    }

    selectDay(day){
        const target = new RegExp('^' + day + '$', 'g');
        cy.contains(el.boxDay, target)
        .click()
    }

    appointmentShouldBe(costumer, hour){
        cy.contains('div', costumer.name)
        .should('be.visible')
        .parent()
        .contains(el.boxHour, hour)
        .should('be.visible')

    }
}

export default new DashPage()