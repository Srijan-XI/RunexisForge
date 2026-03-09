# SOAP - Simple Object Access Protocol

## Table of Contents
- [Introduction](#introduction)
- [Why SOAP?](#why-soap)
- [Core Concepts](#core-concepts)
- [SOAP Message Structure](#soap-message-structure)
- [WSDL - Web Services Description Language](#wsdl---web-services-description-language)
- [SOAP vs REST](#soap-vs-rest)
- [Security (WS-Security)](#security-ws-security)
- [Implementation Examples](#implementation-examples)
- [Tools & Libraries](#tools--libraries)
- [Best Practices](#best-practices)
- [Migration from SOAP to REST](#migration-from-soap-to-rest)
- [Enterprise Integration Patterns](#enterprise-integration-patterns)
- [Resources](#resources)

---

## Introduction

SOAP (Simple Object Access Protocol) is a protocol specification for exchanging structured information in web service implementations. Originally developed by Microsoft in 1998, SOAP has been a cornerstone of enterprise web services for decades, particularly in financial, healthcare, and government sectors.

### Key Characteristics
- **Protocol-based**: Strict standards and specifications
- **XML-based**: All messages in XML format
- **Platform-independent**: Works across different systems
- **Language-neutral**: Can be implemented in any language
- **Transport-agnostic**: Works over HTTP, SMTP, TCP, JMS
- **Built-in error handling**: Standardized fault messages
- **WS-* Standards**: Extensive security and reliability features
- **Stateful operations**: Supports complex operations

### SOAP Versions
- **SOAP 1.1**: Original specification (2000)
- **SOAP 1.2**: W3C Recommendation (2003) - Current standard

---

## Why SOAP?

### When to Use SOAP

✅ **Good For:**
- Enterprise applications with strict contracts
- Financial transactions requiring ACID compliance
- Healthcare systems (HIPAA compliance)
- Legacy system integration
- High security requirements
- Formal service contracts (WSDL)
- Stateful operations
- Reliable messaging requirements

❌ **Not Ideal For:**
- Mobile applications (payload overhead)
- Public APIs (complexity)
- Real-time applications
- Microservices architectures
- Simple CRUD operations
- Modern web applications

### Advantages

1. **Standardization & Contracts**
   - Strict WSDL contracts
   - Type safety
   - Auto-generated clients
   - Clear interface definitions

2. **Enterprise Features**
   - WS-Security for encryption/signing
   - WS-ReliableMessaging for guaranteed delivery
   - WS-AtomicTransaction for distributed transactions
   - WS-Coordination for complex workflows

3. **Platform Independence**
   - Works across .NET, Java, PHP, Python
   - Protocol-agnostic transport
   - Vendor-neutral standards

4. **Built-in Error Handling**
   - Standardized fault structure
   - Detailed error information
   - Exception propagation

### Disadvantages

1. **Complexity**
   - Verbose XML payloads
   - Steep learning curve
   - Heavy WS-* stack

2. **Performance**
   - Large message sizes
   - XML parsing overhead
   - Slower than REST/gRPC

3. **Limited Browser Support**
   - Not natively supported
   - Requires additional libraries

---

## Core Concepts

### SOAP Architecture Components

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Client    │─────────│  SOAP Layer  │─────────│   Service   │
│ Application │  HTTP   │  (Envelope)  │  XML    │  Provider   │
└─────────────┘         └──────────────┘         └─────────────┘
                              │
                        ┌─────┴──────┐
                        │    WSDL    │
                        │ (Contract) │
                        └────────────┘
```

### SOAP Building Blocks

1. **Envelope**: Root element, defines message structure
2. **Header**: Optional metadata (authentication, routing)
3. **Body**: Actual message content
4. **Fault**: Error information (when errors occur)

### Transport Protocols

- **HTTP/HTTPS** (most common)
- **SMTP** (email)
- **TCP** (direct socket)
- **JMS** (Java Message Service)
- **MSMQ** (Microsoft Message Queue)

---

## SOAP Message Structure

### Basic SOAP Message

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    
    <soap:Header>
        <!-- Optional header content -->
    </soap:Header>
    
    <soap:Body>
        <!-- Required body content -->
    </soap:Body>
</soap:Envelope>
```

### Request Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:usr="http://example.com/user">
    
    <soap:Header>
        <usr:Authentication>
            <usr:Username>john.doe</usr:Username>
            <usr:Password>secret123</usr:Password>
        </usr:Authentication>
    </soap:Header>
    
    <soap:Body>
        <usr:GetUserDetails>
            <usr:UserId>12345</usr:UserId>
        </usr:GetUserDetails>
    </soap:Body>
</soap:Envelope>
```

### Response Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:usr="http://example.com/user">
    
    <soap:Body>
        <usr:GetUserDetailsResponse>
            <usr:User>
                <usr:UserId>12345</usr:UserId>
                <usr:Name>John Doe</usr:Name>
                <usr:Email>john.doe@example.com</usr:Email>
                <usr:Status>Active</usr:Status>
            </usr:User>
        </usr:GetUserDetailsResponse>
    </soap:Body>
</soap:Envelope>
```

### SOAP Fault (Error) Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <soap:Fault>
            <faultcode>soap:Client</faultcode>
            <faultstring>Invalid User ID</faultstring>
            <faultactor>http://example.com/user</faultactor>
            <detail>
                <error xmlns="http://example.com/error">
                    <code>USR_001</code>
                    <message>User ID 12345 not found in database</message>
                    <timestamp>2026-01-20T10:30:00Z</timestamp>
                </error>
            </detail>
        </soap:Fault>
    </soap:Body>
</soap:Envelope>
```

### SOAP Fault Codes

| Fault Code | Description |
|------------|-------------|
| `VersionMismatch` | Invalid SOAP version |
| `MustUnderstand` | Required header not understood |
| `Client` | Client-side error (bad request) |
| `Server` | Server-side error (processing failed) |

---

## WSDL - Web Services Description Language

### WSDL Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions 
    name="UserService"
    targetNamespace="http://example.com/user"
    xmlns="http://schemas.xmlsoap.org/wsdl/"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:tns="http://example.com/user"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema">

    <!-- Type Definitions -->
    <types>
        <xsd:schema targetNamespace="http://example.com/user">
            <xsd:element name="GetUserRequest">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="UserId" type="xsd:string"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
            
            <xsd:element name="GetUserResponse">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="User" type="tns:UserType"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
            
            <xsd:complexType name="UserType">
                <xsd:sequence>
                    <xsd:element name="UserId" type="xsd:string"/>
                    <xsd:element name="Name" type="xsd:string"/>
                    <xsd:element name="Email" type="xsd:string"/>
                </xsd:sequence>
            </xsd:complexType>
        </xsd:schema>
    </types>

    <!-- Message Definitions -->
    <message name="GetUserRequestMessage">
        <part name="parameters" element="tns:GetUserRequest"/>
    </message>
    
    <message name="GetUserResponseMessage">
        <part name="parameters" element="tns:GetUserResponse"/>
    </message>

    <!-- Port Type (Interface) -->
    <portType name="UserServicePortType">
        <operation name="GetUser">
            <input message="tns:GetUserRequestMessage"/>
            <output message="tns:GetUserResponseMessage"/>
        </operation>
    </portType>

    <!-- Binding (Protocol) -->
    <binding name="UserServiceBinding" type="tns:UserServicePortType">
        <soap:binding style="document" 
                      transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="GetUser">
            <soap:operation soapAction="http://example.com/user/GetUser"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>

    <!-- Service Endpoint -->
    <service name="UserService">
        <documentation>User management service</documentation>
        <port name="UserServicePort" binding="tns:UserServiceBinding">
            <soap:address location="http://example.com/services/user"/>
        </port>
    </service>
</definitions>
```

### WSDL Components

1. **Types**: Data type definitions (XML Schema)
2. **Messages**: Abstract message definitions
3. **Port Types**: Abstract operations (interface)
4. **Bindings**: Protocol and format specifications
5. **Services**: Endpoint locations

---

## SOAP vs REST

| Feature | SOAP | REST |
|---------|------|------|
| **Protocol** | Protocol (strict rules) | Architectural style |
| **Format** | XML only | JSON, XML, HTML, plain text |
| **Transport** | HTTP, SMTP, TCP, JMS | Primarily HTTP/HTTPS |
| **State** | Stateful or stateless | Stateless |
| **Performance** | Slower (XML overhead) | Faster (lightweight) |
| **Security** | WS-Security (built-in) | HTTPS, OAuth, JWT |
| **Error Handling** | Standardized faults | HTTP status codes |
| **Caching** | Complex | HTTP caching |
| **Contract** | WSDL (strict) | Optional (OpenAPI) |
| **Ease of Use** | Complex | Simple |
| **Browser Support** | Limited | Native |
| **Tooling** | Extensive enterprise tools | Modern dev tools |

### Migration Decision Matrix

| Requirement | Use SOAP | Use REST |
|-------------|----------|----------|
| Strict contracts | ✅ | ❌ |
| High security | ✅ | ⚠️ |
| ACID transactions | ✅ | ❌ |
| Legacy integration | ✅ | ❌ |
| Mobile apps | ❌ | ✅ |
| Public APIs | ❌ | ✅ |
| Microservices | ❌ | ✅ |
| Simple CRUD | ❌ | ✅ |

---

## Security (WS-Security)

### WS-Security Example

```xml
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
    
    <soap:Header>
        <wsse:Security soap:mustUnderstand="1">
            <!-- Username Token -->
            <wsse:UsernameToken>
                <wsse:Username>john.doe</wsse:Username>
                <wsse:Password Type="...#PasswordDigest">
                    hashed_password_here
                </wsse:Password>
                <wsse:Nonce>random_nonce_value</wsse:Nonce>
                <wsu:Created>2026-01-20T10:00:00Z</wsu:Created>
            </wsse:UsernameToken>
            
            <!-- Binary Security Token (X.509 Certificate) -->
            <wsse:BinarySecurityToken 
                EncodingType="...#Base64Binary"
                ValueType="...#X509v3">
                certificate_data_here
            </wsse:BinarySecurityToken>
            
            <!-- Digital Signature -->
            <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:SignedInfo>
                    <ds:CanonicalizationMethod Algorithm="..."/>
                    <ds:SignatureMethod Algorithm="..."/>
                    <ds:Reference URI="#Body">
                        <ds:DigestMethod Algorithm="..."/>
                        <ds:DigestValue>digest_value</ds:DigestValue>
                    </ds:Reference>
                </ds:SignedInfo>
                <ds:SignatureValue>signature_value</ds:SignatureValue>
            </ds:Signature>
        </wsse:Security>
    </soap:Header>
    
    <soap:Body wsu:Id="Body">
        <!-- Message content -->
    </soap:Body>
</soap:Envelope>
```

### Security Features

1. **Authentication**
   - Username/Password tokens
   - X.509 certificates
   - Kerberos tokens
   - SAML assertions

2. **Message Integrity**
   - XML Digital Signatures
   - Hash verification
   - Tamper detection

3. **Confidentiality**
   - XML Encryption
   - SSL/TLS transport security
   - Field-level encryption

4. **Non-repudiation**
   - Digital signatures
   - Timestamp validation
   - Audit trails

---

## Implementation Examples

### Java (JAX-WS)

**Service Implementation:**
```java
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.xml.ws.Endpoint;

@WebService(serviceName = "UserService")
public class UserServiceImpl {
    
    @WebMethod(operationName = "GetUser")
    public User getUser(@WebParam(name = "UserId") String userId) {
        // Business logic
        User user = userRepository.findById(userId);
        if (user == null) {
            throw new SOAPException("User not found: " + userId);
        }
        return user;
    }
    
    @WebMethod(operationName = "CreateUser")
    public String createUser(@WebParam(name = "User") User user) {
        return userRepository.save(user).getId();
    }
    
    public static void main(String[] args) {
        Endpoint.publish(
            "http://localhost:8080/services/user",
            new UserServiceImpl()
        );
    }
}

// User class
public class User {
    private String userId;
    private String name;
    private String email;
    
    // Getters and setters
}
```

**Client Implementation:**
```java
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import java.net.URL;

public class UserServiceClient {
    public static void main(String[] args) throws Exception {
        URL wsdlUrl = new URL("http://localhost:8080/services/user?wsdl");
        QName serviceName = new QName(
            "http://example.com/user",
            "UserService"
        );
        
        Service service = Service.create(wsdlUrl, serviceName);
        UserService userService = service.getPort(UserService.class);
        
        // Call service
        User user = userService.getUser("12345");
        System.out.println("User: " + user.getName());
    }
}
```

### Python (Zeep)

**Client Implementation:**
```python
from zeep import Client
from zeep.wsse.username import UsernameToken

# Create client
wsdl_url = 'http://example.com/services/user?wsdl'
client = Client(wsdl_url)

# With authentication
client = Client(
    wsdl_url,
    wsse=UsernameToken('john.doe', 'password123')
)

# Call service
response = client.service.GetUser(UserId='12345')
print(f"User: {response.Name}, Email: {response.Email}")

# Create user
new_user = {
    'UserId': '67890',
    'Name': 'Jane Smith',
    'Email': 'jane@example.com'
}
user_id = client.service.CreateUser(User=new_user)
print(f"Created user ID: {user_id}")
```

**Service Implementation (Python with Spyne):**
```python
from spyne import Application, rpc, ServiceBase, Unicode
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication

class UserService(ServiceBase):
    @rpc(Unicode, _returns=Unicode)
    def get_user(ctx, user_id):
        # Business logic
        user = get_user_from_db(user_id)
        return user.to_xml()
    
    @rpc(Unicode, Unicode, Unicode, _returns=Unicode)
    def create_user(ctx, name, email, password):
        user_id = save_user_to_db(name, email, password)
        return user_id

application = Application(
    [UserService],
    tns='http://example.com/user',
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11()
)

wsgi_app = WsgiApplication(application)

# Run with WSGI server
from wsgiref.simple_server import make_server
server = make_server('0.0.0.0', 8080, wsgi_app)
server.serve_forever()
```

### C# (.NET)

**Service Implementation:**
```csharp
using System.ServiceModel;

[ServiceContract(Namespace = "http://example.com/user")]
public interface IUserService
{
    [OperationContract]
    User GetUser(string userId);
    
    [OperationContract]
    string CreateUser(User user);
}

public class UserService : IUserService
{
    public User GetUser(string userId)
    {
        var user = _repository.FindById(userId);
        if (user == null)
            throw new FaultException("User not found");
        return user;
    }
    
    public string CreateUser(User user)
    {
        return _repository.Save(user).Id;
    }
}

[DataContract]
public class User
{
    [DataMember]
    public string UserId { get; set; }
    
    [DataMember]
    public string Name { get; set; }
    
    [DataMember]
    public string Email { get; set; }
}

// Hosting
class Program
{
    static void Main()
    {
        using (ServiceHost host = new ServiceHost(typeof(UserService)))
        {
            host.Open();
            Console.WriteLine("Service running...");
            Console.ReadLine();
        }
    }
}
```

**Client Implementation:**
```csharp
// Add Service Reference or use ChannelFactory
var binding = new BasicHttpBinding();
var endpoint = new EndpointAddress("http://localhost:8080/UserService");

using (var factory = new ChannelFactory<IUserService>(binding, endpoint))
{
    IUserService client = factory.CreateChannel();
    
    var user = client.GetUser("12345");
    Console.WriteLine($"User: {user.Name}");
    
    var newUser = new User
    {
        Name = "Jane Smith",
        Email = "jane@example.com"
    };
    string userId = client.CreateUser(newUser);
}
```

### PHP (SoapClient)

```php
<?php
// SOAP Client
$wsdl = 'http://example.com/services/user?wsdl';
$options = [
    'soap_version' => SOAP_1_2,
    'trace' => 1,
    'exceptions' => true,
    'cache_wsdl' => WSDL_CACHE_NONE
];

try {
    $client = new SoapClient($wsdl, $options);
    
    // Call service
    $response = $client->GetUser(['UserId' => '12345']);
    echo "User: " . $response->Name . "\n";
    
    // Create user
    $newUser = [
        'Name' => 'Jane Smith',
        'Email' => 'jane@example.com'
    ];
    $userId = $client->CreateUser(['User' => $newUser]);
    echo "Created user ID: " . $userId . "\n";
    
} catch (SoapFault $e) {
    echo "Error: " . $e->getMessage();
}

// SOAP Server
class UserService {
    public function GetUser($userId) {
        // Business logic
        return [
            'UserId' => $userId,
            'Name' => 'John Doe',
            'Email' => 'john@example.com'
        ];
    }
    
    public function CreateUser($user) {
        // Save to database
        return 'generated-user-id';
    }
}

$server = new SoapServer($wsdl);
$server->setClass('UserService');
$server->handle();
?>
```

---

## Tools & Libraries

### Development Tools

**SoapUI**
- GUI for testing SOAP services
- Mock service creation
- Load testing
- Security testing

```bash
# Download from: https://www.soapui.org/
# Or use command-line version
mockservice -p 8080 -wsdl user-service.wsdl
```

**Postman**
```
1. Import WSDL
2. Send SOAP requests
3. Test endpoints
4. Collection management
```

### Language Libraries

| Language | Library | Installation |
|----------|---------|--------------|
| **Java** | JAX-WS | Built-in JDK |
| **Java** | Apache CXF | Maven/Gradle |
| **Python** | Zeep | `pip install zeep` |
| **Python** | Spyne | `pip install spyne` |
| **C#** | WCF | Built-in .NET Framework |
| **.NET Core** | CoreWCF | NuGet package |
| **PHP** | SoapClient | Built-in |
| **Node.js** | node-soap | `npm install soap` |
| **Ruby** | Savon | `gem install savon` |

### Code Generators

```bash
# Java - wsimport (JDK)
wsimport -keep -s src http://example.com/service?wsdl

# .NET - svcutil
svcutil http://example.com/service?wsdl /out:ServiceClient.cs

# Python - zeep
python -m zeep http://example.com/service?wsdl

# Node.js
npx soap-stub-generator http://example.com/service?wsdl
```

---

## Best Practices

### 1. Design Contract-First

```xml
<!-- Define WSDL first, then implement service -->
<definitions name="OrderService" ...>
    <!-- Well-defined types, messages, operations -->
</definitions>
```

### 2. Version Your Services

```xml
<service name="UserService_v2">
    <port name="UserServicePort_v2" binding="tns:UserServiceBinding_v2">
        <soap:address location="http://example.com/services/user/v2"/>
    </port>
</service>
```

### 3. Use Meaningful Fault Codes

```xml
<soap:Fault>
    <faultcode>soap:Client</faultcode>
    <faultstring>Invalid input</faultstring>
    <detail>
        <error xmlns="http://example.com/error">
            <code>VALIDATION_001</code>
            <field>email</field>
            <message>Invalid email format</message>
        </error>
    </detail>
</soap:Fault>
```

### 4. Implement Logging & Monitoring

```java
// Log requests and responses
@WebServiceHandler
public class LoggingHandler implements SOAPHandler<SOAPMessageContext> {
    @Override
    public boolean handleMessage(SOAPMessageContext context) {
        Boolean outbound = (Boolean) context.get(
            MessageContext.MESSAGE_OUTBOUND_PROPERTY
        );
        
        if (outbound) {
            logger.info("Outbound: " + context.getMessage());
        } else {
            logger.info("Inbound: " + context.getMessage());
        }
        return true;
    }
}
```

### 5. Optimize Performance

- Use MTOM (Message Transmission Optimization Mechanism) for binary data
- Enable compression
- Implement caching
- Connection pooling
- Async operations

```java
// MTOM for binary data
@MTOM
@WebService
public class FileService {
    @WebMethod
    public void uploadFile(@WebParam(name = "file") DataHandler file) {
        // Handle binary data efficiently
    }
}
```

### 6. Security Best Practices

- Always use HTTPS in production
- Implement WS-Security
- Validate all input
- Use strong authentication
- Encrypt sensitive data
- Regular security audits

---

## Migration from SOAP to REST

### Migration Strategy

**Phase 1: Analysis**
```
1. Inventory SOAP services
2. Identify dependencies
3. Assess complexity
4. Plan migration order
```

**Phase 2: Dual Implementation**
```
1. Implement REST endpoints
2. Keep SOAP running
3. Gradual client migration
4. Monitor both APIs
```

**Phase 3: Deprecation**
```
1. Announce SOAP deprecation
2. Provide migration guide
3. Support period
4. Sunset SOAP services
```

### Mapping SOAP to REST

| SOAP Concept | REST Equivalent |
|--------------|-----------------|
| Operation | HTTP Method + Resource |
| WSDL | OpenAPI/Swagger |
| XML Message | JSON Payload |
| SOAP Fault | HTTP Status Code |
| WS-Security | OAuth 2.0 / JWT |
| UDDI | API Gateway / Registry |

### Example: SOAP to REST Conversion

**SOAP:**
```xml
<!-- Operation: GetUser -->
<soap:Envelope>
    <soap:Body>
        <GetUser>
            <UserId>12345</UserId>
        </GetUser>
    </soap:Body>
</soap:Envelope>
```

**REST:**
```http
GET /api/users/12345 HTTP/1.1
Accept: application/json
Authorization: Bearer <token>
```

---

## Enterprise Integration Patterns

### Request-Reply Pattern

```
Client → [Request] → Service
Client ← [Response] ← Service
```

### One-Way Pattern

```
Client → [Notification] → Service
(No response expected)
```

### Asynchronous Pattern

```
Client → [Request] → Service
           ↓
        [Queue]
           ↓
Client ← [Callback] ← Service
```

### Orchestration Pattern

```
Client → Orchestrator → Service A
                      → Service B
                      → Service C
                      ↓
Client ← Response ←──────┘
```

---

## Resources

### Official Specifications
- [SOAP 1.2 Specification](https://www.w3.org/TR/soap12/)
- [WSDL 1.1 Specification](https://www.w3.org/TR/wsdl)
- [WS-Security Specification](http://docs.oasis-open.org/wss/)

### Tools
- [SoapUI](https://www.soapui.org/) - Testing tool
- [Apache CXF](https://cxf.apache.org/) - Java framework
- [Postman](https://www.postman.com/) - API client

### Libraries & Frameworks
- **Java**: JAX-WS, Apache CXF, Apache Axis2
- **Python**: Zeep, Spyne, suds-jurko
- **C#**: WCF, CoreWCF
- **Node.js**: node-soap, strong-soap
- **PHP**: PHP SoapClient, NuSOAP

### Learning Resources
- [W3Schools SOAP Tutorial](https://www.w3schools.com/xml/xml_soap.asp)
- [Oracle JAX-WS Tutorial](https://docs.oracle.com/javaee/7/tutorial/jaxws.htm)
- [Microsoft WCF Documentation](https://docs.microsoft.com/en-us/dotnet/framework/wcf/)

### Books
- "Web Services Essentials" by Ethan Cerami
- "Java Web Services" by Martin Kalin
- "SOA Patterns" by Arnon Rotem-Gal-Oz

---

**Last Updated**: January 2026  
**SOAP Version**: 1.2  
**WSDL Version**: 1.1
