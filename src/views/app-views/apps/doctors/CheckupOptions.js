import Loading from "components/shared-components/Loading";
import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const CheckupOptions = () => {
  const { services, isLoading, refetch } = useFetch("checkupOption");

  if (isLoading) {
    return <Loading cover="content" align={"center"} loading={true} />;
  }
  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "Check Up ID",
      dataIndex: "checkup_id",
      key: "checkup_id",
      sorter: (a, b) => a.checkup_id - b.checkup_id,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },

    {
      title: "Ceneric Options ID",
      dataIndex: "checkup_generic_option_id",
      key: "checkup_generic_option_id",
      sorter: (a, b) =>
        a.checkup_generic_option_id - b.checkup_generic_option_id,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="CheckUp Reservation Options"
        addEndPoint="doctors/AddCheckupOptions"
        endPoint={"checkupOption"}
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  );
};

export default CheckupOptions;
