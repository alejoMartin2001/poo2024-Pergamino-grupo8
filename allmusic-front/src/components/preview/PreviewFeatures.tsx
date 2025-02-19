
import playlist from '@images/preview/icon-feature-1.svg';
import album from '@images/preview/icon-feature-2.svg';
import listen from '@images/preview/icon-feature-3.svg';
import { Feature } from './Feature';

export const PreviewFeatures = () => {
  return (
    <div className="grid grid-cols-3 gap-10 px-40 py-10 max-lg:grid-cols-1 max-lg:gap-5 max-lg:px-10 ">
      <Feature
        image={playlist}
        title={"Crea y Comparte"}
        description={`Descubre y organiza tus canciones favoritas en listas de reproducción personalizadas. 
          Puedes escuchar tus playlists en cualquier momento y compartirlas con amigos para disfrutar juntos de la música.`
        }
      />

      <Feature
        image={album}
        title={"Escucha y Descubre"}
        description={`Accede a una amplia colección de álbumes. 
          Puedes encontrar tus artistas favoritos, escuchar las últimas novedades y explorar géneros variados. 
          ¡Sumérgete en la música que amas!`
        }
      />

      <Feature 
        image={listen} 
        title={"Voces que Inspiran"} 
        description={`Descubre a tus artistas favoritos y sumérgete en sus historias a través de sus canciones.
          Escucha sus interpretaciones y disfruta de la magia de la música en cada nota.`
        } 
      />
    </div>
  )
}