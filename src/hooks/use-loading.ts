import { useState } from "react"

export default function useLoading() {
    const [loading, setLoading] = useState(false)
    const isPending = (load: boolean) => {
        setLoading(load)
    }
    return { isPending, loading }
}
