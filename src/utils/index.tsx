export const baseUrl = "http://localhost:8080/v1";

export const getLogger: (tag: string) => (...args: any) => void =
  (tag) =>
  (...args) =>
    console.log(tag, ...args);

const log = getLogger("api");

export interface ResponseProps<T> {
  data: T;
}

export async function withLogs<T>(
  promise: Promise<ResponseProps<T>>,
  fnName: string
): Promise<T> {
  log(`${fnName} - started`);
  try {
    const res = await promise;
    log(`${fnName} - succeeded`);
    return await Promise.resolve(res.data);
  } catch (err) {
    log(`${fnName} - failed`, err);
    return await Promise.reject(err);
  }
}

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authConfig = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
