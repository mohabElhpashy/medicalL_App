import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomSubmittion from "../../Components/CustomSubmittion";
const { Option } = Select;
const formItemLayout = {};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddPhotoSession = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);

  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const { services } = useFetch("photographer");
  const emptyState = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    price: "",
    main_image: null,
    photos_count: "0",
    photographer_id: null,
  };

  let initalState;
  if (location.state !== undefined) {
    const { record } = location.state;
    for (const key in record) {
      if (
        key === "updated_at" ||
        key === "created_at" ||
        key === "deleted_at"
      ) {
        delete record[key];
      }
    }
    initalState = record;
  } else {
    initalState = emptyState;
  }
  const [postObject, setPostObject] = useState(initalState);
  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.name_ar && postObject.name_en) return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      const data = new FormData();
      for (const key of Object.keys(postObject)) {
        data.append(key, postObject[key]);
      }
      if (initalState === emptyState) {
        await service.post("/web/photosession", data);
      } else {
        await service.put(`/web/photosession/${postObject.id}`, data);
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);

      setError(true);
    }
  };

  //Handel Upload Image

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      const img = info.fileList[0];
      setPostObject({ ...postObject, main_image: img });
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setPostObject({
          ...postObject,
          main_image: info.fileList[0].originFileObj,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      {error || isSuccess ? (
        <CustomSubmittion
          type={isSuccess ? "success" : "error"}
          samePage="photographer/AddPhotoSession"
          tablePage="photographer/photoSession"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New PhotoSession"
              : "Editing Record"}
          </h2>
          <Form
            {...formItemLayout}
            form={form}
            onSubmitCapture={(e) => {
              e.preventDefault();
              handelSubmit(postObject);
            }}
            name="register"
            // onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="name_ar"
              label={
                <span>
                  Name in Arabic&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your name in Arabic"
                name="name_ar"
                value={postObject.name_ar}
                onChange={(e) =>
                  setPostObject({ ...postObject, name_ar: e.target.value })
                }
                defaultValue={postObject.name_ar}
              />
            </Form.Item>
            <Form.Item
              name="name_en"
              label={
                <span>
                  Name in English&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Please enter your name in English"
                value={postObject.name_en}
                defaultValue={postObject.name_en}
                name="name_en"
                onChange={(e) =>
                  setPostObject({ ...postObject, name_en: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              required
              name="description_ar"
              label={
                <span>
                  Description in Arabic:&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your Description!",
                  whitespace: true,
                },
              ]}
            >
              <Input.TextArea
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    description_ar: e.target.value,
                  })
                }
                placeholder="Please enter your Description in Arabic"
                value={postObject.description_ar}
                defaultValue={postObject.description_ar}
                name="description_ar"
              />
            </Form.Item>

            <Form.Item
              required
              name={"description_en"}
              label="Descritpion in English"
            >
              <Input.TextArea
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    description_en: e.target.value,
                  })
                }
                placeholder="Please enter your Description in English"
                value={postObject.description_en}
                defaultValue={postObject.description_en}
                name="description_en"
              />
            </Form.Item>
            <Form.Item required name={"price"} label="Price">
              <Input
                type="number"
                onChange={(e) =>
                  setPostObject({ ...postObject, price: e.target.value })
                }
                placeholder="Please enter your Price in EGP"
                value={postObject.price}
                defaultValue={postObject.price}
                addonAfter="EGP"
                name="price"
              />
            </Form.Item>
            <Form.Item required name={"photos_count"} label="Photos Count">
              <Input
                type="number"
                onChange={(e) =>
                  setPostObject({ ...postObject, photos_count: e.target.value })
                }
                placeholder="Please enter your Photos Count "
                defaultValue={postObject.photos_count}
                value={postObject.photos_count}
                addonAfter="Photos"
                name="photos_count"
              />
            </Form.Item>

            <Form.Item
              name="photographer_id"
              required
              label={<span>PhotoGrapher&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a PhotoGrapher"
                optionFilterProp="children"
                defaultValue={postObject.photographer_id}
                onChange={(e) =>
                  setPostObject({ ...postObject, photographer_id: e })
                }
                value={postObject.photographer_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {services?.map((element) => (
                  <Option key={element.id} value={element.id}>
                    {element.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name={"main_image"} label="Upload an Image">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload an Image</Button>
              </Upload>
              {/* <input type="file" name="main_image" onChange={imageUpload} /> */}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("photoSession")}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={!buttonValidation()}
                onClick={() => setLoading(true)}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};
export default AddPhotoSession;
