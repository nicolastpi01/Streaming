import React, { useEffect, useState } from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { mocked } from 'ts-jest/utils'
import Home, {Props} from "../containers/Home";
import * as mediaAPI from '../APIs/mediaAPI';

//jest.mock('../APIs/mediaAPI');
const searchSugestionsSpy = jest.spyOn(mediaAPI, 'searchSugestions');
const searchVideosSpy = jest.spyOn(mediaAPI, 'searchVideos')
//jest.spyOn(mediaAPI, 'searchSugestions');


//Mas usadas: mockImplementationOnce, mockResolvedValueOnce, mockRejectedValueOnce
const promesaTHENDa  = (msj:string) => jest.fn().mockResolvedValueOnce(msj);
const promesaCATCHDa = (msj:string) => jest.fn().mockRejectedValue(new Error(msj));

function renderHome(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    onSubmit(msj) {
      return;
    },
    onGETSugestions(sugerencia) {
      return;
    },
    onGETVideos(log) {
      return;
    },
  };
  return render(<Home {...defaultProps} {...props} />);
}


describe("<Home />", () => {
  /*afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });*/
  test("Ante cambios de search, se buscan sugerencias y responde ok", async () => {
    const textoBuscado = 'sugerencia';
    const onGETSugestions = jest.fn();
    //const mediaAPImocked = mocked(mediaAPI,true);
    //mediaAPImocked.searchSugestions = promesaTHENDa();
    searchSugestionsSpy.mockResolvedValueOnce(textoBuscado);
    const {findByTestId} = renderHome({onGETSugestions});
    const search = await findByTestId("busqueda-recomendaciones-texto");

    await act( async () => {
      await fireEvent.change(search, { target: { value: textoBuscado } });
    });

    expect(onGETSugestions).toHaveBeenCalledWith("ok");
  });

  test("Ante cambios de search, se buscan sugerencias y responde bad", async () => {
    const textoBuscado = 'sugerencia';
    const onGETSugestions = jest.fn();
    searchSugestionsSpy.mockRejectedValue(new Error("bad"));

    const {findByTestId} = renderHome({onGETSugestions});
    const search = await findByTestId("busqueda-recomendaciones-texto");

    await act( async () => {
      await fireEvent.change(search, { target: { value: textoBuscado } });
    });
    //expect(searchSugestionsSpy).toHaveBeenCalledWith(textoBuscado);
    expect(onGETSugestions).toHaveBeenCalledWith("bad");
  });

  test("Se buscan videos y devuelve vacio, se notifica 0", async () => {
    const onSubmit = jest.fn();
    const {findByTestId} = renderHome({onSubmit});
    searchVideosSpy.mockResolvedValue([]);

    const searchSugestion = await findByTestId("busqueda-recomendaciones-texto");
    const search = await findByTestId("busqueda-recomendaciones-submit");

    await act( async () => {
      //TODO poner el handleChange para setear search
      await fireEvent.change(searchSugestion, { target: { value: "gg" } });
      await fireEvent.submit(search)
    });
    
    //await expect(onSubmit).toHaveBeenCalledWith("searchVideos");
    //await expect(searchVideosSpy).toHaveBeenCalled();
    await expect(onSubmit).toHaveBeenCalledWith(0);
  });

  //mensaje es del estilo:<No se han encontrado videos para ese criterio de búsqueda>
  test("Se buscan videos y no devuelve ninguno, aparece un cartel con un mensaje", async () => {
    const onSubmit = jest.fn();
    const {findByTestId} = renderHome({onSubmit});
    const mediaAPImocked = mocked(mediaAPI,true);
    mediaAPImocked.searchVideos = jest.fn();
    mediaAPImocked.searchVideos.mockRejectedValueOnce("Error");

    const search = await findByTestId("busqueda-recomendaciones-submit");
    await act( async () => {
      await fireEvent.submit(search);
    });

    await expect(mediaAPImocked.searchVideos).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledTimes(0);
    
    //cuando falle: expect(resultado).toBeUndefined();
  });
});