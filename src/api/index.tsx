import { apiFetch } from "./apiFetch";

const PORT_BACKEND = process.env.REACT_APP_PORT_BACKEND || "5000";
const URL_BACKEND = process.env.REACT_APP_API_URL_BACKEND || "http://localhost";

export const API_URL_BACKEND = `${URL_BACKEND}:${PORT_BACKEND}/api/`;

export const getPassword = (email: string) =>
  apiFetch(`user/forgot/password`, { method: "POST", body: email });
export const getConfirmToken = (userId: any, token: any) =>
  apiFetch(`user/valid/token/${userId}/${token}`);
export const saveUserApi = (user: any) =>
  apiFetch(`user`, { method: "POST", body: user });
export const changeApiPassword = (id: any, pass: any) =>
  apiFetch(`user/${id}`, { method: "PUT", body: pass });
export const resetApiPassword = (id: any, pass: any) =>
  apiFetch(`user/reset/password`, {
    method: "PUT",
    body: { userId: id, newPassword: pass.password },
  });

export const editUserApi = (user: any, userId: any, person: any) => {
  if (person === "client")
    return apiFetch(`${person}/${userId}`, { method: "PUT", body: user, headers: { 'Content-Type': 'application/json' } });
  else
    return apiFetch(`${person}/${userId}`, {
      method: "PUT",
      body: user,
      headers: { 'Content-Type': 'application/json' },
    });
};

export const deleteCardApi = (cardId: any, userId: any) =>
  apiFetch(`card/${userId}/${cardId}`, { method: "DELETE" });

export const loginApi = (email: any, password: any) =>
  apiFetch(`login`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${email}:${password}`),
    },
  });

//Paged services
export const getPagedEmployeesApi = (start: any, end: any) =>
  apiFetch(`employee?range=[${start},${end}]`);
export const getPagedTuitionsApi = () => apiFetch(`tuition`);
export const getPagedSpecialitiesApi = () => apiFetch(`speciality`);
export const getPagedTypeEmployeesApi = () => apiFetch(`typeEmployee`);
export const getCategoriesApi = () => apiFetch(`category`);
export const getPagedTypeDocsApi = () => apiFetch(`typeDoc`);

//Get all for combo
export const getTuitionsApi = () => apiFetch(`tuition/all`);
export const getAgreementsAllApi = () => apiFetch(`agreement/all`);
export const getSpecialitiesApi = () => apiFetch(`speciality/all`);
export const getTypeEmployeesApi = () => apiFetch(`typeEmployee/all`);
export const getTypeDocsApi = () => apiFetch(`typeDoc/all`);
export const getRolesApi = () => apiFetch(`role/all`);
export const getRegionsApi = () => apiFetch(`region`);
export const getProvincesForRegion = (regionId: any) =>
  apiFetch(`region/province/${regionId}`);
export const getDistrictsForProvince = (provinceId: any) =>
  apiFetch(`province/district/${provinceId}`);
export const getEmployeesByType = (typeEmployeeId: any) =>
  apiFetch(`employee/type/${typeEmployeeId}`);
export const getServicesAllApi = () => apiFetch(`service/all`);
export const getMethodsAllApi = () => apiFetch(`method/all`);
export const getUnitsAllApi = () => apiFetch(`unit/all`);
export const getReferenceValuesAllApi = () => apiFetch(`referenceValue/all`);
export const getHeadquartersAllApi = () => apiFetch(`headquarter/all`);
export const getTypeAgreementsAllApi = () => apiFetch(`typeAgreement/all`);
export const getExaminationsAllApi = () => apiFetch(`examination/all`);
export const getProfessionsAllApi = () => apiFetch(`profession/all`);
export const getNationAllApi = () => apiFetch(`nation/all`);
export const getAmbAllApi = () => apiFetch(`amb/all`);
export const getUserApi = () => apiFetch(`user`);
export const getEmployeesAllApi = (criteria: any, query: any) =>
  apiFetch(`employee/all?${criteria}=${query}`);

export const getEmployeeById = (criteria: any, query: any) =>
  apiFetch(`employee/id?${criteria}=${query}`);

// Get for search query
//agreement
export const getFilterAgreeApi = (query: any, service = "") =>
  apiFetch(`agreement/filter?string=${query}&service=${service}`);

export const getFilterExamApi = (query: any, service = "") =>
  apiFetch(`examination/filter?string=${query}&service=${service}`);
export const getFilterEmployeesApi = (criteria: any, query: any) =>
  apiFetch(`employee?${criteria}=${query}`);
export const getFilterPatientsApi = (criteria: any, query: any) =>
  apiFetch(`client?${criteria}=${query}`);
export const getFilterAppointmentsApi = (criteria: any, query: any, status: any) =>
  apiFetch(`appointment?${criteria}=${query}&status=${status}`);

export const getAppointmentsByReferer = (criteria: any, query: any, status: any) =>
  apiFetch(`appointment/referer/search?${criteria}=${query}&status=${status}`);

export const getAppointmentsByDates = (start: any, end: any, status: any) =>
  apiFetch(`appointment/dates/search?start=${start}&end=${end}&status=${status}`);

export const getAppointmentsByPersonId = (personId: any, status: any) =>
  apiFetch(`appointment/pacient/search?pacientId=${personId}&status=${status}`);


export const getFilterPatientAppointmentsApi = (criteria: any, query: any, id: any) =>
  apiFetch(`appointment?${criteria}=${query}&UserId=${id}`);

export const getEmployeeApi = (id: any) => apiFetch(`employee/${id}`);
export const saveEmployeeApi = (data: any) =>
  apiFetch(`user/employee`, { method: "POST", body: data, headers: { 'Content-Type': 'application/json' } });
export const editEmployeeApi = (data: any, userId: any) =>
  apiFetch(`employee/${userId}`, { method: "PUT", body: data, headers: { 'Content-Type': 'application/json' } });
export const deleteEmployeeApi = (userId: any) =>
  apiFetch(`employee/${userId}`, { method: "DELETE" });

export const getAgreementsApi = (start: any, end: any) =>
  apiFetch(`agreement?range=[${start},${end}]`);
export const getAgreementApi = (id: any) => apiFetch(`agreement/${id}`);
export const saveAgreementApi = (data: any) =>
  apiFetch(`agreement/`, { method: "POST", body: data });
export const editAgreementApi = (data: any, id: any) =>
  apiFetch(`agreement/${id}`, { method: "PUT", body: data });
export const deleteAgreementApi = (id: any) =>
  apiFetch(`agreement/${id}`, { method: "DELETE" });

// Agremeents prices list
export const getAgreementsListPriceApi = (agreementId: any) =>
  apiFetch(`priceList?agreementId=${agreementId}`);
export const getPriceListApi = (priceListId: any) =>
  apiFetch(`priceList/${priceListId}`);
export const savePriceListApi = (data: any) =>
  apiFetch(`priceList/`, { method: "POST", body: data });
export const editPriceListApi = (id: any, data: any) =>
  apiFetch(`priceList/${id}`, { method: "PUT", body: data });
export const deletePriceListApi = (id: any) =>
  apiFetch(`priceList/${id}`, { method: "DELETE" });

export const getSpecialtiesApi = (start: any, end: any) =>
  apiFetch(`speciality?range=[${start},${end}]`);
export const getSpecialityApi = (id: any) => apiFetch(`speciality/${id}`);
export const saveSpecialityApi = (data: any) =>
  apiFetch(`speciality/`, { method: "POST", body: data });
export const editSpecialityApi = (data: any, id: any) =>
  apiFetch(`speciality/${id}`, { method: "PUT", body: data });
export const deleteSpecialityApi = (id: any) =>
  apiFetch(`speciality/${id}`, { method: "DELETE" });

export const getServicesApi = (start: any, end: any) =>
  apiFetch(`service?range=[${start},${end}]`);
export const getServiceApi = (id: any) => apiFetch(`service/${id}`);
export const saveServiceApi = (data: any) =>
  apiFetch(`service/`, { method: "POST", body: data });
export const editServiceApi = (data: any, id: any) =>
  apiFetch(`service/${id}`, { method: "PUT", body: data });
export const deleteServiceApi = (id: any) =>
  apiFetch(`service/${id}`, { method: "DELETE" });

export const addRefererApi = (data: any) =>
  apiFetch(`referer/`, { method: "POST", body: data });

export const addDoctorApi = (data: any) =>
  apiFetch(`doctor/`, { method: "POST", body: data });

export const addAppointmentApi = (data: any) =>
  apiFetch(`appointment/`, { method: "POST", body: data });

export const getRefererApi = () => apiFetch(`referer/all`);

export const getDoctorApi = () => apiFetch(`doctor/all`);



// new apis added CA

export const getMethodsApi = (start: any, end: any) =>
  apiFetch(`method?range=[${start},${end}]`);
export const getMethodApi = (id: any) => apiFetch(`method/${id}`);
export const saveMethodApi = (data: any) =>
  apiFetch(`method/`, { method: "POST", body: data });
export const editMethodApi = (data: any, id: any) =>
  apiFetch(`method/${id}`, { method: "PUT", body: data });
export const deleteMethodApi = (id: any) =>
  apiFetch(`method/${id}`, { method: "DELETE" });


export const saveNationApi = (data: any) =>
  apiFetch(`nation/`, { method: "POST", body: data });
export const getNationApi = (id: any) => apiFetch(`nation/${id}`);
export const editNationApi = (data: any, id: any) =>
  apiFetch(`nation/${id}`, { method: "PUT", body: data });
export const deleteNationApi = (id: any) =>
  apiFetch(`nation/${id}`, { method: "DELETE" });


export const saveAmbApi = (data: any) =>
  apiFetch(`amb/`, { method: "POST", body: data });
export const getAmbApi = (id: any) => apiFetch(`amb/${id}`);
export const editAmbApi = (data: any, id: any) =>
  apiFetch(`amb/${id}`, { method: "PUT", body: data });
export const deleteAmbApi = (id: any) =>
  apiFetch(`amb/${id}`, { method: "DELETE" });


export const saveBrandApi = (data: any) =>
  apiFetch(`brand/`, { method: "POST", body: data });
export const deleteBrandApi = (id: any) =>
  apiFetch(`brand/${id}`, { method: "DELETE" });
export const getBrandAllApi= (start: any, end: any, status: any) =>
  apiFetch(`brand?range=[${start},${end}]&status=${status}`);
export const getBrandApi = (id: any) => apiFetch(`brand/${id}`);


export const getModelApi = (id: any) => apiFetch(`model/brand/${id}`);
export const getModelsApi = (id: any) => apiFetch(`model/${id}`);
export const saveModelApi = (data: any) =>
  apiFetch(`model/`, { method: "POST", body: data });
export const deleteModelApi = (id: any) =>
  apiFetch(`model/${id}`, { method: "DELETE" });
export const savePathApi = (data: any) =>
  apiFetch(`path/`, { method: "POST", body: data });


export const getUnitsApi = (start: any, end: any) =>
  apiFetch(`unit?range=[${start},${end}]`);
export const getUnitApi = (id: any) => apiFetch(`unit/${id}`);
export const saveUnitApi = (data: any) =>
  apiFetch(`unit/`, { method: "POST", body: data });
export const editUnitApi = (data: any, id: any) =>
  apiFetch(`unit/${id}`, {
    method: "PUT",
    body: data,
  });
export const deleteUnitApi = (id: any) =>
  apiFetch(`unit/${id}`, {
    method: "DELETE",
  });

export const getPatientApi = (id: any) => apiFetch(`client/${id}`);
export const getPagedPatientsApi = (start: any, end: any) =>
  apiFetch(`client?range=[${start},${end}]`);
export const getPatienByDOCApi = (criteria: any, doc: any) =>
  apiFetch(`client/doc/search?${criteria}=${doc}`);

export const getMatchAllApi = () => apiFetch(`match/`);


export const getPatientByNameApi = (criteria: any, name: any, criteria2: any, lastNameP: any) =>
  apiFetch(`client/name/search?${criteria}=${name}&${criteria2}=${lastNameP}`);

export const savePatientApi = (data: any) =>
  apiFetch(`user/client`, { method: "POST", body: data });
export const editPatientApi = (data: any, userId: any) =>
  apiFetch(`client/${userId}`, { method: "PUT", body: data });
export const deletePatientApi = (userId: any) =>
  apiFetch(`client/${userId}`, { method: "DELETE" });

export const getExamValuesApi = (appointmentId: any) =>
  apiFetch(`appointment/examvalues/${appointmentId}`);
export const getAppointmentsApi = (start: any, end: any, status: any, date: any) =>
  apiFetch(`appointment?range=[${start},${end}]&status=${status}&date=${date}`);
export const getAppointmentsPatientApi = (start: any, end: any, id: any) =>
  apiFetch(`appointment?range=[${start},${end}]&UserId=${id}`);
export const getAppointmentsResultsApi = (appointmentId: any) =>
  apiFetch(`appointment/result/${appointmentId}`);
export const getExamValueResult = (appointmentDetailId: any) =>
  apiFetch(`appointment/examvalueresult/${appointmentDetailId}`);
export const getAppointmentApi = (id: any) => apiFetch(`appointment/${id}`);
export const getAppointmentPatientApi = (id: any) => apiFetch(`appointment/pacient/${id}`);
export const saveAppointmentApi = (data: any) =>
  apiFetch(`appointment/`, { method: "POST", body: data });
export const attendAppointmentApi = (data: any, id: any) =>
  apiFetch(`appointment/attend/${id}`, { method: "PUT", body: data });
export const editAppointmentApi = (data: any, id: any) =>
  apiFetch(`appointment/${id}`, { method: "PUT", body: data });
export const deleteAppointmentApi = (id: any) =>
  apiFetch(`appointment/${id}`, { method: "DELETE" });

export const getPagedExaminationsApi = (start: any, end: any) =>
  apiFetch(`examination?range=[${start},${end}]`);
export const getExaminationApi = (id: any) => apiFetch(`examination/${id}`);
export const saveExaminationApi = (data: any) =>
  apiFetch(`examination/`, { method: "POST", body: data });
export const editExaminationApi = (data: any, id: any) =>
  apiFetch(`examination/${id}`, { method: "PUT", body: data });
export const deleteExaminationApi = (id: any) =>
  apiFetch(`examination/${id}`, { method: "DELETE" });
export const getExaminationId = (id: any) =>
  apiFetch(`examination/${id}`, { method: "GET" });


export const getReferenceValuesApi = (start: any, end: any) =>
  apiFetch(`referenceValue?range=[${start},${end}]`);
export const getExaminationValuesByExamId = (id: any, appointmentId: any) =>
  apiFetch(
    `referenceValue/exam/${id}/${appointmentId ? `?appointmentId=${appointmentId}` : ""
    }`
  );
export const getReferenceValueApi = (id: any) => apiFetch(`referenceValue/${id}`);
export const saveReferenceValueApi = (data: any) =>
  apiFetch(`referenceValue/`, { method: "POST", body: data });
export const editReferenceValueApi = (data: any, id: any) =>
  apiFetch(`referenceValue/${id}`, { method: "PUT", body: data });

export const editExamReferenceValueApi = (id: any, data: any) =>
  apiFetch(`referenceValue/exam/edit/${id}`, { method: "PUT", body: data });

export const editExaminationValueApi = (id: any, data: any) =>
  apiFetch(`examination/edit/values/${id}`, { method: "PUT", body: data });


export const editExaminations = (data: any) =>
  apiFetch(`examination/examn/edit`, { method: "PUT", body: data });

export const editGroupApi = (id: any, data: any) =>
  apiFetch(`examination/group/edit/${id}`, { method: "PUT", body: data });



export const getExaminationValues = () => apiFetch(`referenceValue/exam/examinationValues/`);


export const deleteReferenceValueApi = (id: any) =>
  apiFetch(`referenceValue/${id}`, { method: "DELETE" });

export const saveTypeEmployeeApi = (data: any) =>
  apiFetch(`typeEmployee`, { method: "POST", body: data });
export const saveTuitionApi = (data: any) =>
  apiFetch(`tuition`, { method: "POST", body: data });
export const saveProfessionApi = (data: any) =>
  apiFetch(`profession`, { method: "POST", body: data });

export const getMenuUserApi = (userId: any) => apiFetch(`user/menu/${userId}`);

export const getHeadquartersAgreementApi = (headquartersId: any) =>
  apiFetch(`agreement?headquarterId=${headquartersId}`);
export const editHeadquarterApi = (id: any, data: any) =>
  apiFetch(`headquarter/${id}`, { method: "PUT", body: data, headers: { 'Content-Type': 'application/json' } });
export const saveHeadquarterApi = (data: any) =>
  apiFetch(`headquarter/`, { method: "POST", body: data, headers: { 'Content-Type': 'application/json' } });
export const getHeadquarterApi = (id: any) => apiFetch(`headquarter/${id}`);

export const reportExamMonthly = (month: any, year: any, AgreementId: any, HeadquarterId: any) =>
  apiFetch(
    `report/appointments?month=${month}&year=${year}&AgreementId=${AgreementId}&HeadquarterId=${HeadquarterId}`
  );

export const reportExamByDate = (day: any, month: any, year: any, AgreementId: any, HeadquarterId: any) =>
  apiFetch(
    `report/appointments/date?day=${day}&month=${month}&year=${year}&AgreementId=${AgreementId}&HeadquarterId=${HeadquarterId}`
  );
export const reportPdfResult = (appointmentId: any) =>
  apiFetch(`report/result/${appointmentId}`);
