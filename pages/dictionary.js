import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TableWords from "../src/components/table/TableWords";
import Layout from "../src/layout/Layout";
import Banner3 from "../src/components/banner/Banner3";
import Banner from "../src/components/banner/Banner";
import {
    Button,
    Label,
    FormGroup,
    Container,
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap";
import { useSession } from "next-auth/react";
import DataTable from "../src/components/table/Mui_datatables";
import axios from "axios";

export default function MyWords() {
    const { data: session } = useSession();
    const [dados, setDados] = useState(null)
    const [token, setToken] = useState()


    useEffect(() => {
        if (session) {
            setToken(session?.user?.token)
        }
    }, [session])

    useEffect(() => {
        axios.get('http://localhost:5000/visualizarPalavras', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((res) => res.data)
            .then((data) => {
                setDados(data)
            })
    }, [token])

    if (session) {
        return (
            <Layout>
                <Banner3 />
                <Card>
                    <CardBody>
                        <DataTable dados={dados}/>
                    </CardBody>
                </Card>
            </Layout>
        )
    } else {
        return (
            <>
                <Layout>
                    <Banner />
                </Layout>
            </>
        )
    }


}