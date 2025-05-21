export const updateUser = async (userId, payload, token) => {
  const formData = new FormData();
  formData.append("userName", JSON.stringify(payload.userName));
  formData.append("address", JSON.stringify(payload.address));
  formData.append("phone", payload.phone);

  const res = await fetch(`/api/v1/user/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};
