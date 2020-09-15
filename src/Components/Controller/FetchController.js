export async function FecthGetCtrl(url) {
  try {
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    const responseData = await response.json()
    // console.log(responseData)
    return responseData
  } catch (error) {
    return console.warn(error)
  }
}

export async function FecthPostCtrl(Theurl, TheBody) {
  try {
    const response = await fetch(Theurl,
      {
        method: 'POST',
        body: JSON.stringify(TheBody),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    const responseData = await response.json()
    // console.log(responseData)
    return responseData
  } catch (error) {
    return console.warn(error)
  }
}
