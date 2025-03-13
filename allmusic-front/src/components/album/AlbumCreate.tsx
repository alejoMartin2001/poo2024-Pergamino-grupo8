import { Modal } from "@shared/components";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AlbumForm } from "./AlbumForm";


export const AlbumCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-7xl mx-auto mb-4 max-2xl:px-4 py-6 ">
        <div
          className="w-48 p-3 bg-gray-800 rounded-lg transition duration-200 cursor-pointer
           text-gray-600 hover:text-gray-400"
          onClick={() => setIsModalOpen(true)}
        >
          <div className=" flex items-center justify-center size-full">
            <Plus className="w-48 h-48 bg-transparent" />
          </div>
          <h3 className="text-center font-medium">Crear Álbum</h3>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Álbum"
        size="large"
      >
        <AlbumForm setIsModalOpen={setIsModalOpen}/>
      </Modal>
    </div>
  )
}