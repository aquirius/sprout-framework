import { useCallback, useState } from "react";

export interface APIRequest{
	readonly payload?: any;
}

export interface APIPut {
	readonly putSuccess: boolean;
	readonly putPayload?: any;
	readonly data?: any;
	readonly putBusy: boolean;
  readonly putVersion: number;
  readonly put: () => void;
}


const useAPIPut = (target: string, method: string, request: APIRequest): APIPut => {
  const [data, setData] = useState<any>()
  const [success, setSuccess] = useState(false)
  const [busy, setBusy] = useState(true)
  const [versionState, setVersion] = useState(0)

  var put = useCallback(() => {
    const _request = new Request(target, {
      method: "put",
      body: JSON.stringify(request.payload),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
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
      setData(json)
      return;
    }).finally(() => {
      setSuccess(true)
      setBusy(false)
    }).catch((err) => {
      setSuccess(false)
      setBusy(false)
    })
  },[versionState, target])

  // console.log({
  //   postSuccess: success,
  //   busy: busy,
  //   version: versionState,
  //   payload: request.payload,
	// 	data: data,
  //   post:post,
  // })

  return {
    putSuccess: success,
    putBusy: false,
    putVersion: versionState,
    putPayload: request.payload,
		data: data,
    put:put,
  }
}


export interface APIPost {
	readonly postSuccess: boolean;
	readonly postPayload?: any;
	readonly data?: any;
	readonly postBusy: boolean;
  readonly postVersion: number;
  readonly post: () => void;
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
      setData(json)
      return;
    }).finally(() => {
      setSuccess(true)
      setBusy(false)
    }).catch((err) => {
      setSuccess(false)
      setBusy(false)
    })
  },[versionState, target])

  // console.log({
  //   postSuccess: success,
  //   busy: busy,
  //   version: versionState,
  //   payload: request.payload,
	// 	data: data,
  //   post:post,
  // })

  return {
    postSuccess: success,
    postBusy: false,
    postVersion: versionState,
    postPayload: request.payload,
		data: data,
    post:post,
  }
}

export interface APIGet {
	readonly getSuccess: boolean;
	readonly data?: any;
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

  // console.log({
  //   getSuccess: success,
  //   getBusy: busy,
  //   getVersion: versionState,
	// 	getData: data,
  //   get:get,
  // })

  return {
    getSuccess: success,
    getBusy: false,
    getVersion: versionState,
		data: data,
    get:get,
  }
}


export {useAPIPost, useAPIGet, useAPIPut}
