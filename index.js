const express = require('express')
const basicAuth = require('express-basic-auth')
const logger = require('./log/logger')
const httpLogger = require('./log/httpLogger')

const app = express()
const httpPort = 8080
const isUseAuth = false

app.use(express.json())
app.use(httpLogger)

if (isUseAuth) {
    app.use(basicAuth({
        users: {'login': 'password'},
        unauthorizedResponse: getUnauthorizedResponse
    }))
}


function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

app.get('/auth', (req, res) => {
    logger.info(req.body)
    const logins = {
        'login': 'demo',
        'password': '5566'
    }
    if (req.body) {
        if (logins.password === req.body.password && logins.login === req.body.login) {
            res.json({
                "result": "success",
                "message": ""
            })
        } else {
            res.status(400)
            res.json({
                "result": "failed",
                "message": "Credentials are wrong"
            })
        }
    } else {
        res.status(400)
        res.json({
            "result": "failed",
            "message": "Request body is wrong"
        })
    }
})
app.get('/usedEquipmentDic', (req, res) => {
    res.contentType("application/json")
    res.json([
        {
            "description": "Лазерная"
        },
        {
            "description": "Криогенная"
        },
        {
            "description": "Эндоскопическая"
        },
        {
            "description": "Рентгенологическая"
        },
        {
            "description": "Микрохирургическая"
        },
        {
            "description": "Не использовалась"
        }
    ])
})
app.get('/urgencyDic', (req, res) => {
    res.contentType("application/json")
    res.json([
        {
            "description": "Экстренно"
        },
        {
            "description": "Планово"
        },
        {
            "description": "Неотложно"
        }
    ])
})
app.get('/operationComplicationsDict', (req, res) => {
    res.contentType("application/json")
    res.json([
        {
            "description": "Местные инфекции (нагноение, некроз)"
        },
        {
            "description": "Несостоятельность швов анастомоза"
        },
        {
            "description": "Внутрибрюшные абсцессы, перитонит"
        },
        {
            "description": "Кровотечение"
        },
        {
            "description": "Тромбозы и эмболии"
        },
        {
            "description": "Пневмонии и другие легочные осложнения"
        },
        {
            "description": "Ятрогенные осложнения"
        },
        {
            "description": "Гематомы, серомы, инфильтраты"
        },
        {
            "description": "Прочие"
        }
    ])
})
app.get('/machineDic', (req, res) => {
    res.contentType("application/json")
    res.json([
        {
            "description": "Экстренно"
        },
        {
            "description": "Планово"
        },
        {
            "description": "Неотложно"
        }
    ])
})
app.get('/helpTypeDic', (req, res) => {
    res.contentType("application/json")
    res.json([
        {
            "description": "Первичная медико-санитарная помощь"
        },
        {
            "description": "Первичная доврачебная медико-санитарная помощь"
        },
        {
            "description": "Первичная врачебная медико-санитарная помощь"
        },
        {
            "description": "Первичная специализированная медико-санитарная помощь"
        },
        {
            "description": "Высокотехнологичная медицинская помощь"
        },
        {
            "description": "Скорая медицинская помощь"
        },
        {
            "description": "Паллиативная медицинская помощь"
        }
    ])
})
app.get('/protocol', (req, res) => {
    res.contentType("application/json")
    res.json({
        "patient": {
            "fio": "Игнатов Гавриил Иванович",
            "dob": "01.01.1980",
            "age": 33,
            "sexDic": "M",
            "cardNumber": "43434223",
            "signDateTime": "05.05.2022 15:14"
        },
        "operationProtocol": {
            "nameMedOrg": "ОГБУЗ...",
            "department": "Хирургическое отделение",
            "inplace": false,
            "helpTypeDic": "Первичная медико-санитарная помощь",
            "admissionDateTime": "05.05.2022 15:14",
            "operationName": "Название операции",
            "urgencyDic": "Экстренно",
            "startDateTime": "05.05.2022 15:14",
            "finishDateTime": "06.05.2022 19:14"
        },
        "operationGroup": {
            "surgeon": "Лукин Виталий Артемович",
            "freelanceSurgeon": "Зуев Иван Семенович",
            "ordinator": "Кузнецов Соломон Денисович",
            "assistantFirst": "Кулаков Филипп Владимирович",
            "assistantSecond": "Маслов Арсен Ростиславович",
            "assistantThird": "Пахомов Арнольд Максимович",
            "operatingNurseFirst": "",
            "operatingNurseSecond": "",
            "anesthetist": "Сорокин Трофим Юлианович",
            "anesthesiaNurse": "Журавлёв Агафон Германович",
            "cardiologist": "Дмитриев Гавриил Русланович",
            "xrayradiologist": "Родионов Арнольд Дмитрьевич",
            "neurologist": "Лихачёв Яков Матвеевич",
            "Radiologist": "Баранов Станислав Даниилович",
            "xrayTechnologist": "Зайцев Вилен Георгиевич",
            "transfusiologist": "Коновалов Лаврентий Артёмович",
            "transfusiologistNurse": "Захаров Виталий Федосеевич",
            "perfusionist": "Костин Антон Ярославович",
            "perfusionistNurse": "Савельев Адриан Пантелеймонович",
            "medicalPhysicist": "Исаев Степан Наумович",
            "neurophysiologist": "Власов Леонтий Геннадьевич"
        },
        "operationDetail": {
            "anesthesia": {
                "common": {
                    "combined": false,
                    "total": false,
                    "inhalation": false,
                    "intravenous": false,
                    "monitoring": false
                },
                "regional": {
                    "spinal": false,
                    "epidural": true,
                    "spinalEpidural": false,
                    "conductor": true,
                    "interfascialBlockade": false
                },
                "local": {
                    "application": false,
                    "infiltration": true
                }
            },
            "machineDic": [
                {
                    "id": "1",
                    "name": "machine1"
                },
                {
                    "id": "2",
                    "name": "machine2"
                }
            ],
            "usedEquipmentDic": [
                {
                    "name": "Лазерная"
                },
                {
                    "name": "Криогенная"
                }
            ],
            "diagnosisBefore": "fromdict",
            "surgeryType": "fromdict",
            "diagnosisBeforeSurgery": "some text",
            "diagnosisComplication": "fromDict",
            "diagnosisComplicationExtended": "some text",
            "diagnosisPostoperative": "fromDict",
            "diagnosisPostoperativeDetailed": "some text",
            "surgicalTreatmentType": "fromDict",
            "operationNumber": "some text",
            "operationDescription": "some text",
            "operationComplications": "fromDict",
            "operationComplicationsDescription": "some text",
            "operationOutcome": "some text",
            "used": "some text",
            "histologicalPreparationDescription": "some text"
        },
        "detail": {
            "dosePerMinute": 45,
            "unitDosePerMinuteDic": "Гр",
            "irradiationTime": 500
        },
        "onMachine": {
            "localization": "любой текст",
            "prescribedDose": 123,
            "prescribedIsodose": 100,
            "maxDose": 123,
            "totalDose": 123,
            "unitDosePerMinuteDic": "Гр"
        }
    })
})

app.listen(httpPort, () =>
    logger.info(`Express.js listening on port ${httpPort}`))
