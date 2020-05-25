import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { VideosResult } from '../types/VideosResult';
import { getVideo} from '../APIs/mediaAPI';
import { CardGroup, Card, CardDeck } from 'react-bootstrap';
import Paginacion, { Props as PagProps} from "../components/Paginacion";

export interface Props {
  media: VideosResult;
  location: {state: VideosResult};
}

const Reproductor : React.FC<Props> = (props) => {
    const [reproductor,setreproductor] = useState<any>();
    const [videoURL, setVideoURL] = useState<string>();
    useEffect(() => {
        console.log(props)
        let media = props.location.state;
        setVideoURL( getVideo(media.indice.toString()) );
    }, [props]);

    return <>
    <ReactPlayer style={{ }}
        ref={(player:any) => setreproductor(player) }
        width={"small"}
        height={"small"}
        url={videoURL}
        controls={true}
        fluid={true}
    >
    </ReactPlayer>

    </>
}

export default Reproductor;