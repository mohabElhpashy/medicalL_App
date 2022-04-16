import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload } from "antd";

const PhotoGrapher = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("photographer");
  const [singleImage, setSingleImage] = useState("");

  const [currentList, setCurrentList] = useState([]);
  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Store Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Seller Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(`/app/apps/CRM/veForm?name=view&id=${obj.seller_id}`)
          }
        >
          {name}
        </a>
      ),
    },
    {
      title: "Main Image ",
      dataIndex: "main_image",
      key: "main_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            fileList={[
              {
                uid: obj.id,
                name: obj.name_en,
                status: "done",
                url: obj.main_image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.main_image)}
            listType="picture-card"
          />
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
    },
    // {
    //   title: "Albums",
    //   render: (photo, Obj) => (
    //     <Link
    //       to={{
    //         pathname: `album`,
    //         search: `?id=${Obj.id} `,
    //       }}
    //     >
    //       Show Album
    //     </Link>
    //   ),

    //   key: "photos_count",
    // },
    {
      title: "Open At",
      dataIndex: "open_at",
      key: "open_at",
      sorter: (a, b) => a.open_at - b.open_at,
    },
    {
      title: "Close At",
      dataIndex: "close_at",
      key: "close_at",
      sorter: (a, b) => a.close_at - b.close_at,
    },

    {
      title: "City Name",
      dataIndex: "city_name",
      key: "city_name",
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="List of Photographers"
        endPoint="photographer"
        addEndPoint="photographer/AddPhotoGrapher"
        editEndPoint="photographer/editReadForm"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        // noDeleteAction={true}
        error={error}
        noAddOption
        dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        searchUrl="stores/search/5?store_search"
      />
      <Modal
        visible={singleImage.length > 0}
        footer={null}
        onCancel={() => setSingleImage("")}
      >
        <img
          alt="image"
          style={{ width: "100%", height: 350 }}
          src={singleImage}
        />
      </Modal>
    </>
  );
};

export default PhotoGrapher;
