export const parseRequestURL = () => {
  const url = location.hash.slice(2),
    request = {};

  [request.resource, request.locality, request.action] = url.split('/');

  return request;
};
