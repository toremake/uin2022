import {useState} from 'react'

export default function Form({onSubmit, handleChange, formData}) {
    //Tar imot funksjoner for input-oppdatering og innsending fra App.js,
    //samt formData (state) for å behandle input-verdier.
    //Har også droppet å lage egne komponenter for input, siden det bare er en input. Testet heller textarea og hvordan
    //handleChange fungerte med ulike skjemakomponenter.
    return(
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Tittel</label>
            <input type="text" name="title" value={formData['title']} onChange={handleChange} id="title" />
            <label htmlFor="description">Beskrivelse</label>
            <textarea name="description" id="description" onChange={handleChange} rows="8" value={formData['description']}></textarea>
            <p className="buttonHolder"><button type="submit">Legg til</button></p>
        </form>
    )
}