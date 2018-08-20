import axios from "axios";
import Timeline from "../../../../../../src/boot/common/timeline/index";

jest.mock("axios");

describe("Testing Timeline", () => {
  test("callUserInfo", async () => {
    const user = { id: 1, role: { type: "authenticated " } };
    axios.mockImplementationOnce(() => Promise.resolve({ data: { user } }));
    const userInfo = await Timeline.callUserInfo();
    expect(userInfo).toStrictEqual({ data: { user } });
  });

  test("callUserAuth", async () => {
    const user = { id: 1, fullname: "SourceDigital Admin" };
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: { user } })
    );
    const userInfo = await Timeline.callUserAuth(user);
    expect(userInfo).toStrictEqual({ user });
  });

  test("callUserLogin", async () => {
    const authResponse = {
      jwt: "authenticated-random-jwt",
      user: { id: 1, role: "authenticated", username: "admin" },
    };
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: authResponse })
    );
    const user = await Timeline.callUserLogin({
      identifier: "user",
      password: "123456",
    });
    expect(user).toStrictEqual(authResponse);
  });

  test("callUserRegister", async () => {
    const authResponse = {
      jwt: "authenticated-random-jwt",
      user: {
        id: 1,
        role: "authenticated",
        username: "admin",
        fullname: "SourceDigital",
      },
    };
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ status: 201, data: authResponse })
    );
    const user = await Timeline.callUserRegister({
      fullname: "SourceDigital",
      email: "contact@sourcedigital.net",
      username: "SourceDigital",
      password: "4Dm1N",
    });
    expect(user).toStrictEqual(authResponse);
  });

  test("updateUserProfile", async () => {
    const dataObj = {
      fullname: "admin",
      role: "public",
    };
    axios.put.mockResolvedValueOnce({
      status: 200,
      data: {
        id: 1,
        fullname: "admin",
        role: "public",
      },
    });
    const updated = await Timeline.updateUserProfile(dataObj, 1);
  });

  test("getSourceExperienceToken", async () => {
    const mockedResponse = { jwt: "jwt-token-here" };
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: mockedResponse,
    });
    const response = await Timeline.getSourceExperienceToken();
    expect(response).toStrictEqual(mockedResponse);
  });

  test("postSourceExperienceToken", async () => {
    const mockedResponse = { success: true };
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: mockedResponse,
    });
    const body = {};
    const response = await Timeline.postSourceExperienceToken(body);
    expect(response.success).toBeTruthy();
  });

  test("callOrder", async () => {
    const mockedResponse = {
      user: {
        id: 1,
        role: "authenticated",
      },
      order: {
        id: "OrderID_123",
        qty: 2,
        product_id: 12,
        price: 15,
        currency: "USD",
        recipt_id: "SRC_123",
      },
    };
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: mockedResponse,
    });
    const order = {
      qty: 2,
      product_id: 12,
    };
    const response = await Timeline.callOrder(order);
    expect(response).toStrictEqual(mockedResponse);
  });

  test("callStock", async () => {
    const mockedResponse = {
      product_id: 12,
      stock: 99,
    };
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: mockedResponse,
    });
    const stockAvailable = await Timeline.callStock(12, 1);
    expect(stockAvailable.stock).toBe(mockedResponse.stock);
  });

  test("callCheckoutPaypal", async () => {
    const mockedResponse = {
      price: 5,
      qty: 10,
      payableAmount: 50,
      orderId: 12,
      paymentLink:
        "https://paypal.com/order/12?accesstoken=randomgeneratedtoken",
    };
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: mockedResponse,
      })
    );
    const checkout = await Timeline.callCheckoutPaypal({
      orderId: 12,
      price: 5,
      qty: 10,
    });
    expect(checkout).toStrictEqual(mockedResponse);
  });

  test("callCheckout", async () => {
    const mockedResponse = {
      price: 5,
      qty: 10,
      payableAmount: 50,
      orderId: 12,
    };
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: mockedResponse,
      })
    );
    const checkout = await Timeline.callCheckout({
      orderId: 12,
      price: 5,
      qty: 10,
    });
    expect(checkout).toStrictEqual(mockedResponse);
  });

  test("callCheckoutShipping", async () => {
    const mockedResponse = {
      details: {
        address: "...",
        contact: "12345",
      },
      order: {
        id: 122,
        product_id: 123,
        qty: 5,
        price: 4,
        payableAmount: 20,
      },
    };
    axios.post.mockResolvedValueOnce({
      status: 201,
      data: mockedResponse,
    });
    const shippingData = await Timeline.callCheckoutShipping();
    expect(shippingData).toStrictEqual(mockedResponse);
  });
});
