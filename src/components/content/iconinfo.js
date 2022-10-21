import React, {useEffect, useState} from "react";
import * as joint from 'jointjs';

//importing icons (TODO look for a better method of doing this.  IT LOOKS STUPID)
//ACTORS
import Actors_Bank_Online1 from "../../svg/symbols/actors/bank1-online.svg"
import Actors_Bank_Online2 from "../../svg/symbols/actors/bank2-online.svg"
import Actors_Bank3 from "../../svg/symbols/actors/bank3.svg"
import Actors_Bank4 from "../../svg/symbols/actors/bank4.svg"
import Actors_Bank5 from "../../svg/symbols/actors/bank5.svg"
import Actors_Bank6 from "../../svg/symbols/actors/bank6.svg"
import Actors_Employee1 from "../../svg/symbols/actors/employee1.svg"
import Actors_Employee2 from "../../svg/symbols/actors/employee2.svg"
import Actors_Employee3 from "../../svg/symbols/actors/employee3.svg"
import Actors_Employee4 from "../../svg/symbols/actors/employee4.svg"
import Actors_Employee5 from "../../svg/symbols/actors/employee5.svg"
import Actors_Employee6 from "../../svg/symbols/actors/employee6.svg"
import Actors_Employee7 from "../../svg/symbols/actors/employee7.svg"
import Actors_Employee8 from "../../svg/symbols/actors/employee8.svg"
import Actors_Employee9 from "../../svg/symbols/actors/employee9.svg"
import Actors_Employee10 from "../../svg/symbols/actors/employee10.svg"
import Actors_Employee11 from "../../svg/symbols/actors/employee11.svg"
import Actors_Employee12 from "../../svg/symbols/actors/employee12.svg"
import Actors_Employee13 from "../../svg/symbols/actors/employee13.svg"
import Actors_Employee14 from "../../svg/symbols/actors/employee14.svg"
import Actors_Employee15 from "../../svg/symbols/actors/employee15.svg"
import Actors_Employee16 from "../../svg/symbols/actors/employee16.svg"
import Actors_ServiceProvider1 from "../../svg/symbols/actors/service-provider-1.svg"
import Actors_ServiceProvider2 from "../../svg/symbols/actors/service-provider-2.svg"
import Actors_ServiceProvider3 from "../../svg/symbols/actors/service-provider-3.svg"
import Actors_ServiceProvider4 from "../../svg/symbols/actors/service-provider-4.svg"
import Actors_ServiceProvider5 from "../../svg/symbols/actors/service-provider-5.svg"
import Actors_Staff_IT1 from "../../svg/symbols/actors/staff-IT1.svg"
import Actors_Staff_IT2 from "../../svg/symbols/actors/staff-IT2.svg"
import Actors_Staff_IT3 from "../../svg/symbols/actors/staff-IT3.svg"
import Actors_Staff_tech1 from "../../svg/symbols/actors/staff-tech1.svg"
import Actors_Staff_tech2 from "../../svg/symbols/actors/staff-tech2.svg"
import Actors_Staff_tech3 from "../../svg/symbols/actors/staff-tech3.svg"
import Actors_Store1 from "../../svg/symbols/actors/store-1.svg"
import Actors_Store2 from "../../svg/symbols/actors/store-2.svg"
import Actors_Store3 from "../../svg/symbols/actors/store-3.svg"
import Actors_Store4 from "../../svg/symbols/actors/store-4.svg"
import Actors_Tech1_Database from "../../svg/symbols/actors/tech1-database.svg"
import Actors_Tech2_Database from "../../svg/symbols/actors/tech2-database.svg"
import Actors_Tech3_Server from "../../svg/symbols/actors/tech3-server.svg"
import Actors_Tech4_VirtualMachine from "../../svg/symbols/actors/tech4-virtual-machine.svg"
import Actors_Tech5_Cloud from "../../svg/symbols/actors/tech5-cloud.svg"
import Actors_Tech6_Network from "../../svg/symbols/actors/tech6-network.svg"
import Actors_Tech7_System from "../../svg/symbols/actors/tech7-system.svg"
import Actors_Tech8_SystemCloud from "../../svg/symbols/actors/tech8-system-cloud.svg"
import Actors_User1 from "../../svg/symbols/actors/user1.svg"
import Actors_User2 from "../../svg/symbols/actors/user2.svg"
import Actors_User3 from "../../svg/symbols/actors/user3.svg"
import Actors_User4 from "../../svg/symbols/actors/user4.svg"
import Actors_User5 from "../../svg/symbols/actors/user5.svg"
import Actors_User6 from "../../svg/symbols/actors/user6.svg"
import Actors_User7 from "../../svg/symbols/actors/user7.svg"
import Actors_User8 from "../../svg/symbols/actors/user8.svg"
import Actors_User9 from "../../svg/symbols/actors/user9.svg"
import Actors_User10 from "../../svg/symbols/actors/user10.svg"
import Actors_User11 from "../../svg/symbols/actors/user11.svg"
import Actors_User12 from "../../svg/symbols/actors/user12.svg"
import Actors_User13 from "../../svg/symbols/actors/user13.svg"
import Actors_User14 from "../../svg/symbols/actors/user14.svg"
import Actors_User15 from "../../svg/symbols/actors/user15.svg"
import Actors_User16 from "../../svg/symbols/actors/user16.svg"
import Actors_User17 from "../../svg/symbols/actors/user17.svg"
import Actors_User18 from "../../svg/symbols/actors/user18.svg"
import Actors_User19 from "../../svg/symbols/actors/user19.svg"
import Actors_User20 from "../../svg/symbols/actors/user20.svg"
//HEALTH
import Health_ChiefNurse from "../../svg/symbols/health/chief-nurse.svg"
import Health_Doctor1 from "../../svg/symbols/health/doctor-1.svg"
import Health_Doctor2 from "../../svg/symbols/health/doctor-2.svg"
import Health_Doctor3 from "../../svg/symbols/health/doctor-3.svg"
import Health_Doctor4 from "../../svg/symbols/health/doctor-4.svg"
import Health_GeneralPractitioner from "../../svg/symbols/health/general-practitioner.svg"
import Health_HealthSecretary1 from "../../svg/symbols/health/health-secretary-1.svg"
import Health_HealthSecretary2 from "../../svg/symbols/health/health-secretary-2.svg"
import Health_Hospital1 from "../../svg/symbols/health/hospital-1.svg"
import Health_Hospital2 from "../../svg/symbols/health/hospital-2.svg"
import Health_Hospital3 from "../../svg/symbols/health/hospital-3.svg"
import Health_Hospital4 from "../../svg/symbols/health/hospital-4.svg"
import Health_HospitalComputerSystem from "../../svg/symbols/health/hospital-computer-system.svg"
import Health_HospitalPostOffice from "../../svg/symbols/health/hospital-post-office.svg"
import Health_Nurse1 from "../../svg/symbols/health/nurse-1.svg"
import Health_Nurse2 from "../../svg/symbols/health/nurse-2.svg"
import Health_Nurse3 from "../../svg/symbols/health/nurse-3.svg"
import Health_Nurse4 from "../../svg/symbols/health/nurse-4.svg"
import Health_Patient1 from "../../svg/symbols/health/patient-1.svg"
import Health_Patient2 from "../../svg/symbols/health/patient-2.svg"
import Health_Patient3 from "../../svg/symbols/health/patient-3.svg"
import Health_PatientMedicalRecord1 from "../../svg/symbols/health/patient-medical-record-1.svg"
import Health_PatientMedicalRecord2 from "../../svg/symbols/health/patient-medical-record-2.svg"
import Health_PatientMedicalRecord3 from "../../svg/symbols/health/patient-medical-record-3.svg"
import Health_SecretaryReceptionist1 from "../../svg/symbols/health/secretary-receptionist-1.svg"
import Health_SecretaryReceptionist2 from "../../svg/symbols/health/secretary-receptionist-2.svg"
//COMMUNICATION
import Comm_AppOnPc from "../../svg/symbols/communication/app-on-pc.svg"
import Comm_AppOnSmartPhone from "../../svg/symbols/communication/app-on-smartphone.svg"
import Comm_AppOnTablet from "../../svg/symbols/communication/app-on-tablet.svg"
import Comm_CallCenter from "../../svg/symbols/communication/call-center.svg"
import Comm_Chat from "../../svg/symbols/communication/chat.svg"
import Comm_Email1 from "../../svg/symbols/communication/email-1.svg"
import Comm_Email2 from "../../svg/symbols/communication/email-2.svg"
import Comm_FaceToFaceConversation1 from "../../svg/symbols/communication/face-to-face-conversation-1.svg"
import Comm_FaceToFaceConversation2 from "../../svg/symbols/communication/face-to-face-conversation-2.svg"
import Comm_FaceToFaceConversation3 from "../../svg/symbols/communication/face-to-face-conversation-3.svg"
import Comm_Fax from "../../svg/symbols/communication/app-on-smartphone.svg"
import Comm_Internet_Globe from "../../svg/symbols/communication/internet-globe.svg"
import Comm_Invoice1 from "../../svg/symbols/communication/invoice-1.svg"
import Comm_Letter1 from "../../svg/symbols/communication/letter-1.svg"
import Comm_Telephone1 from "../../svg/symbols/communication/telephone-1.svg"
import Comm_Payment1 from "../../svg/symbols/communication/payment-1.svg"

//CUSTOMER EXPERIENCE
import CustomerExperience_Neutral from "../../svg/symbols/customer_experience/neutral.svg"
import CustomerExperience_Unsatisfied from "../../svg/symbols/customer_experience/unsatisfied.svg"
import CustomerExperience_Satisfied from "../../svg/symbols/customer_experience/satisfied.svg"
import CustomerExperience_VerySatisfied from "../../svg/symbols/customer_experience/very-satisfied.svg"
import CustomerExperience_VeryUnsatisfied from "../../svg/symbols/customer_experience/very-unsatisfied.svg"

//CYBERSECURITY
import Cybersecurity_Attacker from "../../svg/symbols/cybersecurity/attacker.svg"
//import Cybersecurity_Asset from "../../svg/symbols/cybersecurity/asset-symbol.svg"
//import Cybersecurity_Threat from "../../svg/symbols/cybersecurity/special threat.svg"
//import Cybersecurity_Unwanted_Incident from "../../svg/symbols/cybersecurity/special unwanted incident.svg"
//import Cybersecurity_Vulnerability_Locked from "../../svg/symbols/cybersecurity/special vulnerability lock.svg"
//import Cybersecurity_Vulnerability_Unlocked from "../../svg/symbols/cybersecurity/special vulnerability unlock.svg"

import {
    user1,
    employee1,
    bank3,
    staff_tech1,
    store_1,
    tech1_database,
    tech5_cloud,
    service_provider_1,
    staff_IT1
} from "../../svg/symbols/actors/CJMLSymbolsBase64.js"

import { chat,
    email_1,
    internet_globe,
    internet_via_pc_1,
    invoice_1,
    letter_1,
    payment_1,
    telephone_1
} from "../../svg/symbols/communication/CJMLSymbolsBase64.js"

import {
    satisfied
} from "../../svg/symbols/customer_experience/CJMLSymbolsBase64.js"

import {
    doctor_1
} from "../../svg/symbols/health/CJMLSymbolsBase64.js"

import {
    attacker,
    special_threat,
    special_unwanted_incident,
    special_vulnerability_lock,
    special_vulnerability_unlock,
    asset_symbol
} from "../../svg/symbols/cybersecurity/CJMLSymbolsBase64.js"

export default {
    action: {
        chat: {
            icon: <Comm_Chat/>,
            id: "chat",
            description: "A chat",
            svg: {
                icon: chat,
                height: 120,
                width: 180,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.actionElement(),
                attrs: {
                    fill: "#FFF",

                }
            }
        },
    },
    general: {

    },
    actors: {
        user_1: {
            icon: <Actors_User1/>,
            id: "user_1",
            description: "A user",
            subsection: "user",
            svg: {
                icon: user1,
                height: 150,
                width: 1400,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {
                    icon: user1,
                }
            }
        },
        employee_1: {
            icon: <Actors_Employee1/>,
            id: "employee_1",
            description: "An employee",
            subsection: "professional",
            svg: {
                icon: employee1,
                height: 150,
                width: 1400,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {}
            }
        },
        bank_3: {
            icon: <Actors_Bank3 />,
            id: "bank_3",
            description: "A bank",
            subsection: "service-provider",
            svg: {
                icon: bank3,
                height: 150,
                width: 1400,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {}
            }
        },
        service_provider_1: {
            icon: <Actors_ServiceProvider1/>,
            id: "service_provider_1",
            description: "A service provider",
            subsection: "service-provider",
            svg: {
                icon: service_provider_1,
                height: 150,
                width: 1400,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {}
            }
        },
        doctor_1: {
            icon: <Health_Doctor1/>,
            id: "doctor_1",
            description: "A doctor",
            subsection: "professional",
            svg: {
                icon: doctor_1,
                height: 150,
                width: 1400,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {}
            }
        },
        staff_it_1: {
            icon: <Actors_Staff_IT1/>,
            id: "staff_it_1",
            description: "IT staff",
            subsection: "professional",
            svg: {
                icon: staff_IT1,
                height: 150,
                width: 1400,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {}
            }
        },
        staff_tech_1: {
            icon: <Actors_Staff_tech1/>,
            id: "staff_tech_1",
            description: "Technological staff",
            subsection: "professional",
            svg: {
                icon: staff_tech1,
                height: 150,
                width: 1400,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {}
            }
        },
        store_1: {
            icon: <Actors_Store1/>,
            id: "store_1",
            description: "A store",
            subsection: "service-provider",
            svg: {
                icon: store_1,
                height: 150,
                width: 1400,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
            }
        },
        tech_1_database: {
            icon: <Actors_Tech1_Database/>,
            id: "tech_1_database",
            description: "A database",
            subsection: "tech",
            svg: {
                icon: tech1_database,
                height: 150,
                width: 1400,
                iconHeight: 70,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {}
            }
        },
        tech_5_cloud: {
            icon: <Actors_Tech5_Cloud/>,
            id: "tech_5_cloud",
            description: "A data cloud",
            subsection: "tech",
            svg: {
                icon: tech5_cloud,
                height: 170,
                width: 1400,
                iconHeight: 70,
                shapeFn: () => new joint.shapes.cjml.swimlaneElement(),
                attrs: {
                    icon: Actors_Tech5_Cloud,
                }
            }
        },
    },
    communication: {
        chat: {
            icon: <Comm_Chat/>,
            id: "chat",
            description: "A chat",
            svg: {
                icon: chat,
                height: 120,
                width: 180,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.commElement(),
                attrs: {
                    fill: "#FFF",

                }
            }
        },
        email_1: {
            icon: <Comm_Email1/>,
            id: "email_1",
            description: "An email",
            svg: {
                icon: email_1,
                height: 120,
                width: 180,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.commElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        internet_globe: {
            icon: <Comm_Internet_Globe/>,
            id: "internet_globe",
            description: "An internet connection",
            svg: {
                icon: internet_globe,
                height: 120,
                width: 180,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.commElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        invoice_1: {
            icon: <Comm_Invoice1/>,
            id: "invoice_1",
            description: "An invoice",
            svg: {
                icon: invoice_1,
                height: 120,
                width: 180,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.commElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        letter_1: {
            icon: <Comm_Letter1/>,
            id: "letter_1",
            description: "A letter",
            svg: {
                icon: letter_1,
                height: 120,
                width: 180,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.commElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        payment_1: {
            icon: <Comm_Payment1/>,
            id: "payment_1",
            description: "A payment",
            svg: {
                icon: payment_1,
                height: 120,
                width: 180,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.commElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        telephone_1: {
            icon: <Comm_Telephone1/>,
            id: "telephone_1",
            description: "A telephone conversation",
            svg: {
                icon: telephone_1,
                height: 120,
                width: 180,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.commElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
    },
    supplemental: {
        attacker: {
            icon: <Cybersecurity_Attacker/>,
            id: "attacker",
            description: "An attacker",
            svg: {
                icon: special_threat,
                height: 80,
                width: 80,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.unboxedElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        threat: {
            icon: <Cybersecurity_Attacker/>,
            id: "threat",
            description: "A threat",
            svg: {
                icon: special_threat,
                height: 80,
                width: 80,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.unboxedElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        unwanted_incident: {
            icon: <Cybersecurity_Attacker/>,
            id: "unwanted_incident",
            description: "An unwanted incident",
            svg: {
                icon: special_unwanted_incident,
                height: 80,
                width: 80,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.unboxedElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        vulnerability_lock: {
            icon: <Cybersecurity_Attacker/>,
            id: "vulnerability_lock",
            description: "A locked vulnerability",
            svg: {
                icon: special_vulnerability_lock,
                height: 80,
                width: 80,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.unboxedElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        vulnerability_unlock: {
            icon: <Cybersecurity_Attacker/>,
            id: "vulnerability_unlock",
            description: "An attacker",
            svg: {
                icon: special_vulnerability_unlock,
                height: 80,
                width: 80,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.unboxedElement(),
                attrs: {
                    fill: "#FFF",
                }
            }
        },
        asset: {
            icon: <Cybersecurity_Attacker/>,
            id: "asset",
            description: "An asset",
            svg: {
                icon: asset_symbol,
                height: 80,
                width: 80,
                iconHeight: 50,
                shapeFn: () => new joint.shapes.cjml.unboxedElement(),
                attrs: {
                    fill: "#FFF"
                }
            }
        }
    }
};