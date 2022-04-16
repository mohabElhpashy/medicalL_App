import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import GoogleMapsStyle from "constants/GoogleMapsStyle";
import { GOOGLE_MAPS_KEY } from "configs/EnvironmentConfig";

import {
  Card,
Col,
DatePicker,
Form,
Input,
Modal,
Row,
Select,
Table,
Upload,
message,
Button,
Tabs 
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { add, indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import index from "views/app-views/apps/doctors";
import { useFetch } from "hooks";


const { Dragger } = Upload;
const { Option } = Select;



const rules = {
  name: [
    {
      required: true,
      message: "Please enter name",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter product description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  ratio_discount:[
    {
      required: true,
      message: "Please enter ratio discount",
    }
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
  capacity: [
    {
      required: true,
      message: "Please enter capacity",
    },
  ],
  discount: [
    {
      required: true,
      message: "Please enter discount",
    },
  ],
};

const { TabPane } = Tabs;
 

const libraries = ["places"];
const options = {
  styles: GoogleMapsStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const GeneralField = ({
  // category,
  // setPostObject,
  // postObject,
  
  // uploadLoading,
  setPostObject,
  postObject,
  checkView

  

}) => {
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries,
  });
  const onMapClick = (event) => {
    // setMarker({lat:event.latLng.lat() ,lng:event.latLng.lng()})
    const test = event.latLng.lat();
    const test1 = event.latLng.lng();
    setPostObject({
      ...postObject,
      lat: test,
      long: test1,
    });
  };
  const imageUploadProps = {
    name: "file",
    listType: "picture-card",
    showUploadList: false,
  };
  const uploadHandler = async (e,name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 0.5 });
    console.log("options",e.target.files)
    const data=[]
    data.push(e.target.files[0])
    let x=data.map(file=>URL.createObjectURL(file))
    // const imageObject = {file: options.file };
    const formate_data = new FormData();
    console.log("e.target.files",e.target.files[0])
      try {
      
      // message.success({
      //   content: `${test.fileName} Uploaded Successfully!`,
      //   key,
      //   duration: 2,
      // });
      formate_data.append('image',e.target.files[0])

    
      
      if (name === "main_image") {
       setPostObject({ 
          ... postObject,
          icon: formate_data,
          preview_image: x[0],
        });
      } 
      // else {
      //   props.setPostObject({
      //     ...props.postObject,
      //     images: [
      //       ...props.postObject.images,
      //       {
      //         id: Math.floor(Math.random() * 10000),
      //         image: test.file_url,
      //       },
      //     ],
      //   });
      // }
    } catch (error) {
      // message.error({ content: ` Error!`, key, duration: 2 });
    }
  };
  
 
   
  return (
    <Row gutter={16} style={{marginTop:"19px"}}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            required
            style={{
              display: "inline-block",
              width: "calc(100% - 5px)",
              marginRight: 8,
            }}
            name="name"
            label="Name"
            hasFeedback
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ARABIC_NUMBER_CHAR
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Please enter The Name in Arabic");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input
              name="name"
              onPressEnter={(e) => e.preventDefault()}
              disabled={checkView}
              defaultValue={postObject.name}
              onChange={(event) =>
                setPostObject({
                  ...postObject,
                  name: event.target.value,
                })
              }
              placeholder="Please enter delev Name  "
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(100% - 5px)",
            }}
            required
            name="address"
            label="address"
            hasFeedback
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ENGLISH_Number_CHAR
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Please enter The Name in English");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input
            name="address"
            disabled={checkView}
            defaultValue={postObject.address}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObject({
                  ...postObject,
                  address: event.target.value,
                })
              }
              placeholder="Please enter delev address"
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(100% - 5px)",
            }}
            required
            name="phone"
            label="phone"
            hasFeedback
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ENGLISH_Number_CHAR
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Please enter The Name in English");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input
name="phone"
addonBeforen="02"
disabled={checkView}
            defaultValue={postObject.phone}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObject({
                  ...postObject,
                  phone: event.target.value,
                })
              }
              placeholder="Please enter delev phone"
            />
          </Form.Item>
           
 
          
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Location">
        <Form.Item>
            <GoogleMap
                  mapContainerStyle={{ width: 300, height: 400 }}
                  center={{
                    lat: parseFloat(postObject.lat),
                    lng: parseFloat(postObject.long),
                  }}
                  zoom={15}
                  onClick={onMapClick}
                >
                  <Marker
                    position={{
                      lat: parseFloat(postObject.lat),
                      lng: parseFloat(postObject.long),
                    }}
                  />
                </GoogleMap>
          </Form.Item>
          {/* <input type="file" onChange={(e)=>uploadHandler(e,"main_image")}/> */}
          {/* <input type="file"  name="image" onChange={handleSubmit}/> */}


          {/* <Modal
            // visible={singleImage.length > 0}
            footer={null}
            onCancel={() => setSingleImage("")}
          >
            <img
              alt="image"
              style={{ width: "100%", height: 350 }}
              src={singleImage}
            />
          </Modal> */}
        </Card>
        {/* <Card title="Organization">
          <Form.Item name="details" label="Details">
            <Select
              optionFilterProp="children"
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, details: e })
              }
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "100%" }}
              placeholder="Please Select a Detail"
            >
              {props.gerericDetailesList?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
        </Card> */}
      </Col>
    </Row>
  );
};

export default GeneralField;
