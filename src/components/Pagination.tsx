import React, { useState } from 'react';
import {Pagination} from 'react-bootstrap';

const Paginacion : React.FC = (props) => {
    const [items,setItems] = useState([]);

    let cantidad = React.Children.count(props.children)
    //console.log(props.children)
    return <>
        <Pagination>
            <Pagination.Item>{1}</Pagination.Item>
            {
                /*props.children?.forEach( element => {
                    <Pagination.Item>{element}</Pagination.Item>
                })
                Probar con React.Children.map(children, function[(thisArg)])
                o forEach

                Otro util puede ser React.Children.only(children)
                Verifies that children has only one child (a React element) and returns it. Otherwise this method throws an error.
                */

            }
        </Pagination>
    </>
}

export default Paginacion;