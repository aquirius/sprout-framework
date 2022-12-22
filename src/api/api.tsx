import { useCallback, useState } from "react";

export interface APIPost {
	readonly success: boolean;
	readonly payload?: any;
	readonly data?: any;
	readonly busy: boolean;
  readonly version: number;
  readonly post: () => void;
}

export interface APIRequest{
	readonly payload?: any;
}

const useAPIPost = (target: string, method: string, request: APIRequest): APIPost => {

  const [payload, setPayload] = useState<any>()
  const [data, setData] = useState<any>()
  const [success, setSuccess] = useState(false)
  const [busy, setBusy] = useState(true)
  const [versionState, setVersion] = useState(0)


  const _request = new Request(target, {
    method: "post",
    body: request.payload,
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Method": method
    }
  });

  let clone = _request.clone()

  var post = useCallback(() => {
    fetch(clone).then((res) => {
      setVersion(versionState+1)
      if(!res.ok){
        setSuccess(false)
        throw new Error("invalid post");
      }
      return res.json()
    }).then((json)=> {
      console.log("res", json)
      setSuccess(true)
      setBusy(false)
      setData(json)
      return;
    }).catch(() => undefined)
  },[versionState])

  console.log({
    success: success,
    busy: busy,
    version: versionState,
    payload: request.payload,
		data: data,
    post:post,
  })

  return {
    success: success,
    busy: false,
    version: versionState,
    payload: request.payload,
		data: data,
    post:post,
  }
}


export {useAPIPost}
