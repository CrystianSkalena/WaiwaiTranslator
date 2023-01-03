import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../src/layout/Layout";
import Banner3 from "../src/components/banner/Banner3";
import Banner from "../src/components/banner/Banner";
import { Card, CardBody, Button } from "reactstrap";
import DataTable from "../src/components/table/Mui_datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

export default function MyWord({token}) {
  const [dados, setDados] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    axios
      .get("http://localhost:5000/palavras/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setDados(data);
      });
  }, [token]);

  if (session) {
    return (
      <Layout>
        <Banner3 />
        <Card>
          <CardBody>
            <DataTable dados={dados} setDados={setDados} showAction/>
          </CardBody>
        </Card>
        <ToastContainer />
      </Layout>
    );
  } else {
    return (
      <>
        <Layout>
          <Banner />
        </Layout>
      </>
    );
  }
}
export async function getServerSideProps({req, res}) {
  return {
    props: { token: req.cookies.accessToken}, // will be passed to the page component as props
  }
}