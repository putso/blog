import { useEffect } from "react";
import Header from "@/components/Header";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { currentuser, selectUser } from "@/store/slice/userSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useAppDispatch } from "@/store/store";
function Root() {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.isLoading) dispatch(currentuser());
  }, []);
  if (user.isError) return <p>Error</p>;
  if (user.isLoading)
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  return (
    <div>
      <Header user={user.user}></Header>
      <Outlet />
    </div>
  );
}

export default Root;
