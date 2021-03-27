// Model contains the system's internal data as well as functions for validation and determing what data to hand off to the controller.
class Model {
    static #data = {}
    static #initialDate = new Date()
    static #displayDate = this.#initialDate
    static #offset = 0

    static next() {
        this.#offset++
        this.#displayDate.setDate(this.#initialDate.getDate()+1)
    }

    static previous() {
        this.offset--
        this.#displayDate.setDate(this.#initialDate.getDate()-1)
    }

    static add(calendarItem) {
        if ( this.#data[this.#displayDate] === undefined) {
            this.#data[this.#displayDate] = []
        }
        this.#data[this.#displayDate].push(calendarItem)
    }

    static get() {
        return {
            displayDate: this.#displayDate,
            data: this.#data[this.#displayDate] || []
        }
    }
}

// View accepts data as its only input and renders the data accordingly.
class View {
    static render(d) {
        let events = document.getElementById("events")

        // clear out existing data
        for (let i=1; i<events.children.length; i++) {
            events.children[i].remove()
        }
        document.getElementById("newEvent").value = ""

        // render display date
        document.getElementById("date").textContent = d.displayDate

        // populate events
        for (let e of d.data) {
            let div = document.createElement("div")
            div.className = "event"
            div.textContent = e
        let events = document.getElementById("events")
        .appendChild(div)
        }
    }
}

// Controller contains functions to be triggered by events attached to the View.
class Controller {
    static previous(e) {
        Model.previous()
        View.render( Model.get() )
    }

    static next(e) {
        Model.next()
        View.render( Model.get() )
    }

    static add(e) {
        Model.add( document.getElementById("newEvent").value )
        View.render( Model.get() )
    }

    static load(e) {
        View.render( Model.get() )
    }
}

// 
window.addEventListener( "load", Controller.load )