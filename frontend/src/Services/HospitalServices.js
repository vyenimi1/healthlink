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

export async function LoginHostipal(data) {
  return callApiV2("/service/login-hospital","POST",data,null,false,false,null);
};

export async function getHospitalList(data, hospitalId) {
  return callApiV2("/service/get-doctor-list/"+hospitalId,"GET",data,null,false,false,null);
};

