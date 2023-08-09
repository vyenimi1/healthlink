import callApiV2 from '../api/axios';

export async function createHospitals(data) {
  return callApiV2("/service/create-hospital-account","POST",data,null,false,false,null);
};

export async function createUsers(data) {
  return callApiV2("/service/create-user-account","POST",data,null,false,false,null);
};

export async function LoginUsers(data) {
  return callApiV2("/service/login-user","POST",data,null,false,false,null);
};

export async function LoginHospital(data) {
  return callApiV2("/service/login-hospital","POST",data,null,false,false,null);
};

export async function getDoctorList(hospitalId) {
  return callApiV2("/service/get-doctor-list/"+hospitalId,"GET",null,null,false,false,null);
};

export async function getBedList(hospitalId) {
  return callApiV2("/service/get-hospital-bed/"+hospitalId,"GET",null,null,false,false,null);
};

export async function getHospitaldetails(hospitalId) {
  return callApiV2("/service/get-hospital-details/"+hospitalId,"GET",null,null,false,false,null);
};

export async function getUserdetails(UserId) {
  return callApiV2("/service/get-user/"+UserId,"GET",null,null,false,false,null);
};

export async function getBedAvlList(hospitalId) {
  return callApiV2("/service/get-hospital-bed-avail/"+hospitalId,"GET",null,null,false,false,null);
};

export async function getHospitalList() {
  return callApiV2("/service/get-hospital-list","GET",null,null,false,false,null);
};

export async function deleteDoctor(id) {
  return callApiV2("/service/doctor/"+id,"DELETE",null,null,false,false,null);
};

export async function addDoctor(data) {
  return callApiV2("/service/doctor","POST",data,null,false,false,null);
};

export async function updateDoctor(data, id) {
  return callApiV2("/service/doctor/"+id,"PUT",data,null,false,false,null);
};

export async function updateHospitalDetails(data, hospitalId) {
  return callApiV2("/service/hospital/"+hospitalId,"PUT",data,null,false,false,null);
};

export async function updateUserDetails(data, userId) {
  return callApiV2("/service/update-user/"+userId,"PUT",data,null,false,false,null);
};

export async function updateBed(data) {
  return callApiV2("/service/beds","PUT",data,null,false,false,null);
};

export async function updateAvlBed(data) {
  return callApiV2("/service/available-beds","PUT",data,null,false,false,null);
};

