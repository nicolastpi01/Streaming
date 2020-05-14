import React, { useEffect, useState } from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { mocked } from 'ts-jest/utils'
import Home, {Props} from "../containers/Home";
import * as mediaAPI from '../APIs/mediaAPI';

//jest.mock('../APIs/mediaAPI');
const mediaAPImocked = mocked(mediaAPI,true);
const mockConsole = mocked(console,true);

//Mas usadas: mockImplementationOnce, mockResolvedValueOnce, mockRejectedValueOnce
const promesaTHENDa  = (msj:string) => jest.fn().mockResolvedValueOnce(msj);
const promesaCATCHDa = (msj:string) => jest.fn().mockRejectedValue(msj);

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
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Ante cambios de search, se buscan sugerencias y responde ok", async () => {
    const textoBuscado = 'sugerencia';
    const onGETSugestions = jest.fn();
    mediaAPImocked.searchSugestions = promesaTHENDa(textoBuscado);

    const {findByTestId} = renderHome({onGETSugestions});
    const search = await findByTestId("busqueda-recomendaciones-texto");
    await fireEvent.change(search, { target: { value: textoBuscado } });

    expect(onGETSugestions).toHaveBeenCalledWith("ok");
  });

  test("Ante cambios de search, se buscan sugerencias y responde bad", async () => {
    const textoBuscado = 'sugerencia';
    const onGETSugestions = jest.fn();
    mediaAPImocked.searchSugestions = promesaCATCHDa("Error");

    const {findByTestId} = renderHome({onGETSugestions});
    const search = await findByTestId("busqueda-recomendaciones-texto");
    await fireEvent.change(search, { target: { value: textoBuscado } });

    expect(onGETSugestions).toHaveBeenCalledWith("bad");
  });

  test("Se buscan videos y los devuelve, se notifica la cantidad", async () => {
    const onSubmit = jest.fn();
    const {findByTestId} = renderHome({onSubmit});
    const search = await findByTestId("busqueda-recomendaciones-submit");

    mediaAPImocked.searchVideos = jest.fn();
    mediaAPImocked.searchVideos.mockResolvedValueOnce( ["video1","video2","video3"]);
    await fireEvent.submit(search);
    
    await expect(mediaAPImocked.searchVideos).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(3);
  });

  //mensaje es del estilo:<No se han encontrado videos para ese criterio de búsqueda>
  test("Se buscan videos y no devuelve ninguno, aparece un cartel con un mensaje", async () => {
    const onSubmit = jest.fn();
    const {findByTestId} = renderHome({onSubmit});
    const search = await findByTestId("busqueda-recomendaciones-submit");

    mediaAPImocked.searchVideos = jest.fn();
    mediaAPImocked.searchVideos.mockRejectedValueOnce("Error");
    await fireEvent.submit(search);
    
    await expect(mediaAPImocked.searchVideos).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledTimes(0);
    
    //cuando falle: expect(resultado).toBeUndefined();
  });
});