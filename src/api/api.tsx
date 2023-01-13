import { useCallback, useState } from "react";

export interface APIPost {
	readonly postSuccess: boolean;
	readonly postPayload?: any;
	readonly postData?: any;
	readonly postBusy: boolean;
  readonly postVersion: number;
  readonly post: () => void;
}

export interface APIRequest{
	readonly payload?: any;
}

const useAPIPost = (target: string, method: string, request: APIRequest): APIPost => {
  const [data, setData] = useState<any>()
  const [success, setSuccess] = useState(false)
  const [busy, setBusy] = useState(true)
  const [versionState, setVersion] = useState(0)

  var post = useCallback(() => {
    const _request = new Request(target, {
      method: "post",
      body: JSON.stringify(request.payload),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Method": method
      }
    });  
    fetch(_request).then((res) => {
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
  },[versionState, target, method, request.payload])

  console.log({
    success: success,
    busy: busy,
    version: versionState,
    payload: request.payload,
		data: data,
    post:post,
  })

  return {
    postSuccess: success,
    postBusy: false,
    postVersion: versionState,
    postPayload: request.payload,
		postData: data,
    post:post,
  }
}

export interface APIGet {
	readonly getSuccess: boolean;
	readonly getData?: any;
	readonly getBusy: boolean;
  readonly getVersion: number;
  readonly get: () => void;
}

const useAPIGet = (target: string): APIGet => {
  const [data, setData] = useState<any>()
  const [success, setSuccess] = useState(false)
  const [busy, setBusy] = useState(true)
  const [versionState, setVersion] = useState(0)

  var get = useCallback(() => {
    const _request = new Request(target, {
      method: "get",
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
      }
    });
    fetch(_request).then((res) => {
      setVersion(versionState+1)
      if(!res.ok){
        setSuccess(false)
        throw new Error("invalid post");
      }
      return res.json()
    }).then((json)=> {
      setSuccess(true)
      setBusy(false)
      setData(json)
      return;
    }).catch(() => undefined)
  },[versionState, target])

  console.log({
    getSuccess: success,
    getBusy: busy,
    getVersion: versionState,
		getData: data,
    get:get,
  })

  return {
    getSuccess: success,
    getBusy: false,
    getVersion: versionState,
		getData: data,
    get:get,
  }
}


export {useAPIPost, useAPIGet}
