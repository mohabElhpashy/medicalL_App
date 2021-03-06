
import { Avatar, Comment, message, Rate, Table, Tag, Tooltip ,Badge} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import TestError from "../../../auth-views/errors/error-page-2";
function Online_Client_Pending() {
  // const { services, refetch, isLoading, isError } = useFetch("complains");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
  
    useEffect(async()=>{
      try {
         const Records= await service.get("/web/unRegisteredClients") ;
          // openNotificationWithIcon("success");
          // history.push("flashdeals");
          // setSubmitLoading(false);
          setallchat(Records.data)
          console.log("mohahahah",allChat)
        } catch (error) {
          // setSubmitLoading(false);
        }
    },[])

  
  // if (isError) {
  //   <TestError />;
  // }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `# ${id}`,
    },
    {
      title: "Client Name   ",
      key: "id",
      render: (text, Obj) => (
        <Comment
          actions={[
            <span key=' key="comment-basic-dislike"'>
             
            </span>,
          ]}
     
          content={<p>{Obj.client_name}</p>}
        
        />
      ),
    },

    //   {
    //     title: "Client Name",
    //     dataIndex: "client_name",
    //     key: "client_name",
    //   },
    {
      title: "phone",
      dataIndex: "type",
      key: "type",
      render: (text, Obj) => (
        <Comment
          actions={[
            <span key=' key="comment-basic-dislike"'>
             
            </span>,
          ]}
     
          content={<p>{Obj.phone} </p>}
        
        />
      ),
    },
    {
        title: "User Agent ",
        dataIndex: "type",
        key: "type",
        render: (text, Obj) => (
          <Comment
            actions={[
              <span key=' key="comment-basic-dislike"'>
               
              </span>,
            ]}
       
            content={<p>{Obj.user_agent?Obj.user_agent:"null"} </p>}
          
          />
        ),
      },
      {
        title: "Login Method ",
        dataIndex: "type",
        key: "type",
        render: (text, Obj) => (
          <Comment
            actions={[
              <span key=' key="comment-basic-dislike"'>
               
              </span>,
            ]}
       
            content={<p>{Obj.user_agent?Obj.user_agent:"null"} </p>}
          
          />
        ),
      },
      {
        title: "User Ip",
        dataIndex: "type",
        key: "type",
        render: (text, Obj) => (
          <Comment
            actions={[
              <span key=' key="comment-basic-dislike"'>
               
              </span>,
            ]}
       
            content={<p>{Obj.user_ip?Obj.user_ip:"__"} </p>}
          
          />
        ),
      },
    // {
    //     title: "Created At",
    //     dataIndex: "type",
    //     key: "type",
    //     render: (text, Obj) => (
    //       <Comment
    //         actions={[
    //           <span key=' key="comment-basic-dislike"'>
               
    //           </span>,
    //         ]}
       
    //         content={<p>{Obj.created_at.toLocaleString('en-GB')} </p>}
          
    //       />
    //     ),
    //   },

    //   {
    //       title: "Rating",
    //       dataIndex: "rating",
    //       key: "rating",
    //       render:(rate)=>  <Rate allowHalf disabled defaultValue={rate} />
    //       ,
    //       sorter: (a, b) => a.rating - b.rating,
    //     },
    //   {
    //       title: "Review",
    //       dataIndex: "review",
    //       key: "review",
    //     },
    // {
    //   title: "Status",
    //   dataIndex: "active",
    //   key: "active",
    //   render: (text, record) => {
    //     if (text) {
    //       return (
    //         <Tag
    //           className="cursor-pointer"
    //           onClick={() => changeStatus(record)}
    //           color="green"
    //         >
    //           Active
    //         </Tag>
    //       );
    //     } else {
    //       return (
    //         <Tag
    //           className="cursor-pointer "
    //           onClick={() => changeStatus(record)}
    //           color="red"
    //         >
    //           InActive
    //         </Tag>
    //       );
    //     }
    //   },
    // },

    // {
    //   title: "Chat Begined",
    //   key: "Seen",
    //   render: (test, record) => (record.begin_chat ?
    //     <div style={{ display: "flex" }}>
    //     <Badge status="success" />
    //     <span style={{ fontWeight: "bolder" }}>Done</span>
    //   </div>
    //   :<div style={{ display: "flex" }}>
    //   <Badge status="error" />
    //   <span style={{ fontWeight: "bolder" }}>Not Yet</span>
    // </div>
    //   ),
    // },

    ,
  ];
  return (
    <>
      <Table
        tableLayout="auto"
        // rowKey={(item) => item.id?.toString()}
        columns={columns}
        bordered
        dataSource={allChat}
        
        title={() => <h2> Clients Pending </h2>}
      ></Table>
    </>
  );
}


export default Online_Client_Pending;
