import Header from "./header";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/localstorage";
import { useEffect, useState, ReactChildren } from "react";

interface Props {
    children: ReactChildren
  }
  

export default function Layout(props: Props) {
    const router = useRouter();
    const [showHeader, setShowHeader] = useState<boolean>(false);
    const { handleLocalStorage } = useLocalStorage()

    useEffect(() => {
        handleLocalStorage()
    }, [])

    useEffect(() => {
        setShowHeader(router.pathname == "/" ? false : true)
    }, [router.query])

    return (
        <>
            {showHeader && <Header />}
            <main>{props.children}</main>
        </>
    )
}
