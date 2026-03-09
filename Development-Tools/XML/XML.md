# XML

## Introduction

## What is XML?

**XML (Extensible Markup Language)** is a markup language that defines rules for encoding documents in a format that is both human-readable and machine-readable. Unlike HTML, which is designed to display data, XML is designed to store and transport data with a focus on what the data is, not how it looks.

---

## Why Use XML?

- **🏗️ Self-Descriptive**: Data structure is defined within the document
- **🌐 Platform Independent**: Works across different systems and platforms
- **📋 Standardized**: W3C standard with wide industry support
- **🔍 Searchable**: Easy to query with XPath and XQuery
- **📚 Extensible**: Create custom tags for any data structure
- **🔄 Interoperable**: Widely used in enterprise systems and APIs

---

## Key Features

### 1. **Hierarchical Structure**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<library>
    <book id="1">
        <title>The Great Gatsby</title>
        <author>F. Scott Fitzgerald</author>
        <year>1925</year>
        <genre>Fiction</genre>
    </book>
    <book id="2">
        <title>1984</title>
        <author>George Orwell</author>
        <year>1949</year>
        <genre>Dystopian</genre>
    </book>
</library>
```

### 2. **Attributes and Elements**

```xml
<!-- Element-centric -->
<person>
    <name>John Doe</name>
    <age>30</age>
    <city>New York</city>
</person>

<!-- Attribute-centric -->
<person name="John Doe" age="30" city="New York"/>
```

### 3. **Namespaces**

```xml
<root xmlns:book="http://example.com/books"
      xmlns:auth="http://example.com/authors">
    <book:title>XML Guide</book:title>
    <auth:name>Jane Smith</auth:name>
</root>
```

---

## XML Syntax Rules

1. **Must have a root element**: Single top-level element
2. **Tags must be properly nested**: `<a><b></b></a>` ✅, `<a><b></a></b>` ❌
3. **Tags are case-sensitive**: `<Name>` and `<name>` are different
4. **All tags must close**: `<br/>` or `<p></p>`
5. **Attribute values must be quoted**: `attribute="value"`
6. **Special characters must be escaped**: Use entities like `&lt;` `&gt;`

---

## Common Use Cases

### 1. **Configuration Files**

```xml
<?xml version="1.0"?>
<configuration>
    <database>
        <host>localhost</host>
        <port>3306</port>
        <username>admin</username>
        <password>secret</password>
    </database>
    <settings>
        <debug>true</debug>
        <timeout>30</timeout>
    </settings>
</configuration>
```

### 2. **Web Services (SOAP)**

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header/>
    <soap:Body>
        <GetUserRequest>
            <userId>12345</userId>
        </GetUserRequest>
    </soap:Body>
</soap:Envelope>
```

### 3. **Data Exchange**

```xml
<?xml version="1.0"?>
<invoice>
    <invoiceNumber>INV-2024-001</invoiceNumber>
    <date>2024-12-24</date>
    <customer>
        <name>Acme Corp</name>
        <address>123 Main St</address>
    </customer>
    <items>
        <item>
            <description>Widget</description>
            <quantity>10</quantity>
            <price>25.00</price>
        </item>
    </items>
    <total>250.00</total>
</invoice>
```

### 4. **Document Formats**

- **Office Documents**: .docx, .xlsx, .pptx (Office Open XML)
- **SVG**: Scalable Vector Graphics
- **RSS/Atom**: News feeds
- **XHTML**: HTML in XML format

---

## XML vs JSON

| Feature | XML | JSON |
|---------|-----|------|
| **Readability** | More verbose | More concise |
| **Data Types** | Text-based, requires parsing | Native types (string, number, boolean, null) |
| **Arrays** | Repetitive elements | Native array syntax `[]` |
| **Attributes** | Supports attributes | No attributes |
| **Comments** | Supported `<!-- -->` | Not supported |
| **Metadata** | Excellent (attributes, namespaces) | Limited |
| **Validation** | XSD, DTD | JSON Schema |
| **Parsing** | Slower | Faster |
| **File Size** | Larger | Smaller |
| **Use Cases** | Enterprise, document formats | Web APIs, simple data exchange |

---

## XML Document Structure

### Complete XML Document

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE note SYSTEM "note.dtd">
<note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>
```

**Components**:

1. **XML Declaration**: `<?xml version="1.0" encoding="UTF-8"?>`
2. **DOCTYPE**: `<!DOCTYPE note SYSTEM "note.dtd">`
3. **Root Element**: `<note>...</note>`
4. **Child Elements**: `<to>`, `<from>`, etc.

---

## XML Namespaces

Avoid naming conflicts when combining XML from different sources:

```xml
<root xmlns:h="http://www.w3.org/TR/html4/"
      xmlns:f="http://www.example.com/furniture">
    <h:table>
        <h:tr>
            <h:td>Apples</h:td>
            <h:td>Bananas</h:td>
        </h:tr>
    </h:table>
    <f:table>
        <f:name>Coffee Table</f:name>
        <f:width>80</f:width>
        <f:height>40</f:height>
    </f:table>
</root>
```

---

## XML Schema (XSD)

Define structure and validation rules:

```xml
<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="person">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="name" type="xs:string"/>
                <xs:element name="age" type="xs:integer"/>
                <xs:element name="email" type="xs:string"/>
            </xs:sequence>
            <xs:attribute name="id" type="xs:integer" use="required"/>
        </xs:complexType>
    </xs:element>
</xs:schema>
```

---

## XPath and XQuery

### XPath Examples

```xpath
// Select all book titles
/library/book/title

// Select books published after 1950
/library/book[year>1950]/title

// Select the second book
/library/book[2]

// Select all authors
//author
```

### XQuery Example

```xquery
for $book in /library/book
where $book/year > 1950
order by $book/title
return $book/title
```

---

## Popular XML Technologies

### Processing

- **DOM**: Document Object Model (tree-based)
- **SAX**: Simple API for XML (event-based)
- **StAX**: Streaming API for XML (pull parsing)

### Transformation

- **XSLT**: Transform XML to other formats
- **XPath**: Navigate XML documents
- **XQuery**: Query XML data

### Validation

- **DTD**: Document Type Definition
- **XSD**: XML Schema Definition
- **RelaxNG**: Alternative schema language

---

## Real-World Applications

1. **Enterprise Systems**: SAP, Oracle, Microsoft systems
2. **Web Services**: SOAP APIs, WSDL definitions
3. **Office Documents**: Microsoft Office, LibreOffice
4. **Configuration**: Maven (pom.xml), Spring, Android
5. **Publishing**: DocBook, DITA, TEI
6. **Graphics**: SVG, X3D
7. **Feeds**: RSS, Atom
8. **Healthcare**: HL7, CDA documents

---

## XML Tools and Editors

### Editors

- **Oxygen XML Editor**: Professional XML IDE
- **XMLSpy**: Altova XML development tool
- **VS Code**: With XML extensions
- **Eclipse**: XML editing plugins
- **Notepad++**: Basic XML editing

### Validators

- **W3C Validator**: Online XML validation
- **XMLLint**: Command-line tool
- **xmlstarlet**: Command-line XML toolkit

### Libraries by Language

- **Java**: JAXB, DOM4J, XStream
- **Python**: lxml, ElementTree, minidom
- **C#**: System.Xml, LINQ to XML
- **JavaScript**: xml2js, fast-xml-parser
- **PHP**: SimpleXML, DOMDocument

---

## Character Entities

Escape special characters:

| Character | Entity | Numeric |
|-----------|--------|---------|
| < | `&lt;` | `&#60;` |
| > | `&gt;` | `&#62;` |
| & | `&amp;` | `&#38;` |
| " | `&quot;` | `&#34;` |
| ' | `&apos;` | `&#39;` |

---

## Best Practices

1. **✅ Use Meaningful Names**: `<firstName>` not `<fn>`
2. **✅ Prefer Elements Over Attributes**: For complex data
3. **✅ Use Attributes for Metadata**: IDs, types, flags
4. **✅ Follow Naming Conventions**: camelCase or snake_case
5. **✅ Keep It Simple**: Avoid deep nesting
6. **✅ Validate Your XML**: Use XSD schemas
7. **✅ Use Namespaces**: Prevent naming conflicts
8. **✅ Include Encoding**: Specify UTF-8 encoding
9. **✅ Comment Wisely**: Document complex structures
10. **✅ Version Your Schema**: Track schema changes

---

## Security Considerations

⚠️ **XML Security Issues**:

- **XML External Entity (XXE)**: Disable external entity processing
- **Billion Laughs Attack**: Entity expansion DoS
- **XPath Injection**: Sanitize user input
- **Schema Poisoning**: Validate schema sources
- **XML Bomb**: Limit document size

---

## Learning Resources

### Official Documentation

- [W3C XML Specification](https://www.w3.org/XML/)
- [W3Schools XML Tutorial](https://www.w3schools.com/xml/)

### Standards

- [XML 1.0 Specification](https://www.w3.org/TR/xml/)
- [XML Schema](https://www.w3.org/XML/Schema)
- [XPath](https://www.w3.org/TR/xpath/)
- [XSLT](https://www.w3.org/TR/xslt/)

### Books

- "Learning XML" by Erik T. Ray
- "XML in a Nutshell" by Elliotte Rusty Harold
- "XSLT" by Doug Tidwell

---

## Next Steps

Ready to work with XML? Jump to the **User Guide** section below for practical examples, parsing techniques, and language-specific implementations.

---

**Happy XML coding! 📄🔧**

---

## User Guide

Comprehensive guide to working with XML across different programming languages and platforms.

---

## Table of Contents

1. [Creating XML Documents](#creating-xml-documents)
2. [Parsing XML](#parsing-xml)
3. [Validation](#validation)
4. [Transformations (XSLT)](#transformations-xslt)
5. [Querying (XPath)](#querying-xpath)
6. [Language-Specific Implementations](#language-specific-implementations)
7. [Troubleshooting](#troubleshooting)

---

## Creating XML Documents

### Basic XML Document

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
    <book category="cooking">
        <title lang="en">Everyday Italian</title>
        <author>Giada De Laurentiis</author>
        <year>2005</year>
        <price>30.00</price>
    </book>
    <book category="children">
        <title lang="en">Harry Potter</title>
        <author>J K. Rowling</author>
        <year>2005</year>
        <price>29.99</price>
    </book>
</bookstore>
```

### With Namespaces

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root xmlns="http://www.example.com/default"
      xmlns:bk="http://www.example.com/books"
      xmlns:auth="http://www.example.com/authors">
    <bk:book>
        <bk:title>XML Mastery</bk:title>
        <auth:author>
            <auth:name>John Doe</auth:name>
            <auth:email>john@example.com</auth:email>
        </auth:author>
    </bk:book>
</root>
```

### With CDATA Sections

```xml
<?xml version="1.0"?>
<script>
    <code>
        <![CDATA[
            function match(a,b) {
                if (a < b && a < 0) then {
                    return 1;
                } else {
                    return 0;
                }
            }
        ]]>
    </code>
</script>
```

---

## Parsing XML

### JavaScript (Browser)

#### Using DOMParser

```javascript
const xmlString = `
<?xml version="1.0"?>
<bookstore>
    <book>
        <title>XML Guide</title>
        <author>Jane Doe</author>
        <price>29.99</price>
    </book>
</bookstore>`;

// Parse XML
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

// Access elements
const title = xmlDoc.getElementsByTagName("title")[0].textContent;
console.log(title); // "XML Guide"

// Get all books
const books = xmlDoc.getElementsByTagName("book");
for (let book of books) {
    const title = book.getElementsByTagName("title")[0].textContent;
    const author = book.getElementsByTagName("author")[0].textContent;
    console.log(`${title} by ${author}`);
}
```

#### Creating XML

```javascript
// Create XML document
const xmlDoc = document.implementation.createDocument("", "bookstore");

// Create book element
const book = xmlDoc.createElement("book");
book.setAttribute("category", "programming");

// Create child elements
const title = xmlDoc.createElement("title");
title.textContent = "Learning XML";

const author = xmlDoc.createElement("author");
author.textContent = "John Smith";

// Append elements
book.appendChild(title);
book.appendChild(author);
xmlDoc.documentElement.appendChild(book);

// Serialize to string
const serializer = new XMLSerializer();
const xmlString = serializer.serializeToString(xmlDoc);
console.log(xmlString);
```

### JavaScript (Node.js)

#### Using xml2js

```javascript
const xml2js = require('xml2js');

// Parse XML
const xmlString = `
<bookstore>
    <book category="cooking">
        <title>Everyday Italian</title>
        <author>Giada De Laurentiis</author>
    </book>
</bookstore>`;

const parser = new xml2js.Parser();
parser.parseString(xmlString, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result.bookstore.book[0].title[0]); // "Everyday Italian"
});

// Build XML
const builder = new xml2js.Builder();
const obj = {
    bookstore: {
        book: [{
            $: { category: 'programming' },
            title: ['Learning XML'],
            author: ['John Smith']
        }]
    }
};
const xml = builder.buildObject(obj);
console.log(xml);
```

#### Using fast-xml-parser

```javascript
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

// Parse XML
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
});
const result = parser.parse(xmlString);

// Build XML
const builder = new XMLBuilder({
    ignoreAttributes: false
});
const xmlOutput = builder.build(result);
```

### Python

#### Using ElementTree

```python
import xml.etree.ElementTree as ET

# Parse XML from string
xml_string = '''
<bookstore>
    <book category="cooking">
        <title>Everyday Italian</title>
        <author>Giada De Laurentiis</author>
        <year>2005</year>
        <price>30.00</price>
    </book>
</bookstore>'''

root = ET.fromstring(xml_string)

# Parse from file
tree = ET.parse('books.xml')
root = tree.getroot()

# Access elements
for book in root.findall('book'):
    title = book.find('title').text
    author = book.find('author').text
    category = book.get('category')
    print(f"{title} by {author} ({category})")

# Create XML
root = ET.Element('bookstore')
book = ET.SubElement(root, 'book', category='programming')
title = ET.SubElement(book, 'title')
title.text = 'Learning XML'
author = ET.SubElement(book, 'author')
author.text = 'John Smith'

# Write to file
tree = ET.ElementTree(root)
tree.write('output.xml', encoding='utf-8', xml_declaration=True)

# Pretty print
import xml.dom.minidom as minidom
xml_str = ET.tostring(root, encoding='unicode')
pretty_xml = minidom.parseString(xml_str).toprettyxml(indent="  ")
print(pretty_xml)
```

#### Using lxml

```python
from lxml import etree

# Parse XML
tree = etree.parse('books.xml')
root = tree.getroot()

# Using XPath
titles = root.xpath('//book/title/text()')
print(titles)

# Find elements with specific attribute
cooking_books = root.xpath('//book[@category="cooking"]')

# Create XML
root = etree.Element('bookstore')
book = etree.SubElement(root, 'book', category='programming')
title = etree.SubElement(book, 'title')
title.text = 'Learning XML'

# Pretty print
xml_string = etree.tostring(root, pretty_print=True, 
                            encoding='unicode', 
                            xml_declaration=True)
print(xml_string)

# Validate with XSD
schema_root = etree.parse('schema.xsd')
schema = etree.XMLSchema(schema_root)
is_valid = schema.validate(tree)
```

### Java

#### Using DOM

```java
import javax.xml.parsers.*;
import org.w3c.dom.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;

public class XMLExample {
    public static void main(String[] args) throws Exception {
        // Parse XML
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse(new File("books.xml"));
        
        // Normalize
        doc.getDocumentElement().normalize();
        
        // Get elements
        NodeList bookList = doc.getElementsByTagName("book");
        for (int i = 0; i < bookList.getLength(); i++) {
            Node node = bookList.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element book = (Element) node;
                String title = book.getElementsByTagName("title")
                                  .item(0)
                                  .getTextContent();
                System.out.println("Title: " + title);
            }
        }
        
        // Create XML
        Document newDoc = builder.newDocument();
        Element root = newDoc.createElement("bookstore");
        newDoc.appendChild(root);
        
        Element book = newDoc.createElement("book");
        book.setAttribute("category", "programming");
        root.appendChild(book);
        
        Element title = newDoc.createElement("title");
        title.setTextContent("Learning XML");
        book.appendChild(title);
        
        // Write to file
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        
        DOMSource source = new DOMSource(newDoc);
        StreamResult result = new StreamResult(new File("output.xml"));
        transformer.transform(source, result);
    }
}
```

#### Using JAXB

```java
import javax.xml.bind.*;
import javax.xml.bind.annotation.*;
import java.io.File;
import java.util.*;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
class Book {
    @XmlAttribute
    private String category;
    
    @XmlElement
    private String title;
    
    @XmlElement
    private String author;
    
    @XmlElement
    private int year;
    
    // Getters and setters...
}

@XmlRootElement
class Bookstore {
    @XmlElement(name = "book")
    private List<Book> books = new ArrayList<>();
    
    // Getters and setters...
}

public class JAXBExample {
    public static void main(String[] args) throws Exception {
        // Unmarshalling (XML to Object)
        JAXBContext context = JAXBContext.newInstance(Bookstore.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        Bookstore bookstore = (Bookstore) unmarshaller.unmarshal(
            new File("books.xml")
        );
        
        // Marshalling (Object to XML)
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        marshaller.marshal(bookstore, new File("output.xml"));
        marshaller.marshal(bookstore, System.out);
    }
}
```

### C# (.NET)

#### Using XmlDocument

```csharp
using System;
using System.Xml;

class Program
{
    static void Main()
    {
        // Load XML
        XmlDocument doc = new XmlDocument();
        doc.Load("books.xml");
        
        // Get elements
        XmlNodeList bookList = doc.GetElementsByTagName("book");
        foreach (XmlNode book in bookList)
        {
            string title = book["title"].InnerText;
            string author = book["author"].InnerText;
            Console.WriteLine($"{title} by {author}");
        }
        
        // Create XML
        XmlDocument newDoc = new XmlDocument();
        XmlElement root = newDoc.CreateElement("bookstore");
        newDoc.AppendChild(root);
        
        XmlElement book = newDoc.CreateElement("book");
        book.SetAttribute("category", "programming");
        root.AppendChild(book);
        
        XmlElement titleElem = newDoc.CreateElement("title");
        titleElem.InnerText = "Learning XML";
        book.AppendChild(titleElem);
        
        // Save
        newDoc.Save("output.xml");
    }
}
```

#### Using LINQ to XML

```csharp
using System;
using System.Xml.Linq;
using System.Linq;

class Program
{
    static void Main()
    {
        // Load XML
        XDocument doc = XDocument.Load("books.xml");
        
        // Query with LINQ
        var books = from book in doc.Descendants("book")
                    where (string)book.Attribute("category") == "cooking"
                    select new
                    {
                        Title = (string)book.Element("title"),
                        Author = (string)book.Element("author")
                    };
        
        foreach (var book in books)
        {
            Console.WriteLine($"{book.Title} by {book.Author}");
        }
        
        // Create XML
        XDocument newDoc = new XDocument(
            new XElement("bookstore",
                new XElement("book",
                    new XAttribute("category", "programming"),
                    new XElement("title", "Learning XML"),
                    new XElement("author", "John Smith")
                )
            )
        );
        
        newDoc.Save("output.xml");
    }
}
```

#### Using XmlSerializer

```csharp
using System;
using System.Xml.Serialization;
using System.IO;
using System.Collections.Generic;

[XmlRoot("bookstore")]
public class Bookstore
{
    [XmlElement("book")]
    public List<Book> Books { get; set; }
}

public class Book
{
    [XmlAttribute("category")]
    public string Category { get; set;}
    
    [XmlElement("title")]
    public string Title { get; set; }
    
    [XmlElement("author")]
    public string Author { get; set; }
}

class Program
{
    static void Main()
    {
        // Deserialize
        XmlSerializer serializer = new XmlSerializer(typeof(Bookstore));
        using (FileStream fs = new FileStream("books.xml", FileMode.Open))
        {
            Bookstore bookstore = (Bookstore)serializer.Deserialize(fs);
        }
        
        // Serialize
        Bookstore newBookstore = new Bookstore
        {
            Books = new List<Book>
            {
                new Book
                {
                    Category = "programming",
                    Title = "Learning XML",
                    Author = "John Smith"
                }
            }
        };
        
        using (FileStream fs = new FileStream("output.xml", FileMode.Create))
        {
            serializer.Serialize(fs, newBookstore);
        }
    }
}
```

### PHP

```php
<?php
// Load XML
$xml = simplexml_load_file('books.xml');

// Access elements
foreach ($xml->book as $book) {
    echo $book->title . " by " . $book->author . "\n";
    echo "Category: " . $book['category'] . "\n";
}

// Create XML
$bookstore = new SimpleXMLElement('<bookstore/>');
$book = $bookstore->addChild('book');
$book->addAttribute('category', 'programming');
$book->addChild('title', 'Learning XML');
$book->addChild('author', 'John Smith');

// Save
$bookstore->asXML('output.xml');

// Pretty print
$dom = new DOMDocument('1.0');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($bookstore->asXML());
echo $dom->saveXML();
?>
```

---

## Validation

### XML Schema (XSD)

**Schema File** (`books.xsd`):

```xml
<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="bookstore">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="book" maxOccurs="unbounded">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="title" type="xs:string"/>
                            <xs:element name="author" type="xs:string"/>
                            <xs:element name="year" type="xs:integer"/>
                            <xs:element name="price" type="xs:decimal"/>
                        </xs:sequence>
                        <xs:attribute name="category" type="xs:string" use="required"/>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>
```

**Validation in Python**:

```python
from lxml import etree

# Load schema
schema_doc = etree.parse('books.xsd')
schema = etree.XMLSchema(schema_doc)

# Load and validate XML
xml_doc = etree.parse('books.xml')
is_valid = schema.validate(xml_doc)

if not is_valid:
    print(schema.error_log)
```

**Validation in Java**:

```java
import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.*;
import java.io.File;

SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
Schema schema = factory.newSchema(new File("books.xsd"));
Validator validator = schema.newValidator();

try {
    validator.validate(new StreamSource(new File("books.xml")));
    System.out.println("XML is valid");
} catch (Exception e) {
    System.out.println("XML is NOT valid: " + e.getMessage());
}
```

---

## Transformations (XSLT)

**XSLT Stylesheet** (`transform.xslt`):

```xml
<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h2>My Bookstore</h2>
                <table border="1">
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                    <xsl:for-each select="bookstore/book">
                        <tr>
                            <td><xsl:value-of select="title"/></td>
                            <td><xsl:value-of select="author"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
```

**Apply XSLT in Python**:

```python
from lxml import etree

# Load XML and XSLT
xml_doc = etree.parse('books.xml')
xslt_doc = etree.parse('transform.xslt')

# Create transform
transform = etree.XSLT(xslt_doc)

# Apply transformation
result = transform(xml_doc)

# Save result
with open('output.html', 'wb') as f:
    f.write(etree.tostring(result, pretty_print=True))
```

---

## Querying (XPath)

### XPath Syntax

```xpath
// Select all book elements
//book

// Select all titles
//book/title

// Select first book
//book[1]

// Select last book
//book[last()]

// Select books with price > 30
//book[price>30]

// Select books in cooking category
//book[@category='cooking']

// Select title attribute lang
//title/@lang

// Select all text nodes
//text()

// Select all attributes
//@*
```

**Python Example**:

```python
from lxml import etree

tree = etree.parse('books.xml')

# Find all titles
titles = tree.xpath('//book/title/text()')
print(titles)

# Find cooking books
cooking = tree.xpath('//book[@category="cooking"]')
for book in cooking:
    title = book.xpath('./title/text()')[0]
    print(title)

# Complex query
expensive = tree.xpath('//book[price > 30]/title/text()')
```

---

## Troubleshooting

### Common Issues

#### 1. **Encoding Problems**

```python
# Always specify encoding
tree = ET.parse('file.xml', ET.XMLParser(encoding='utf-8'))
```

#### 2. **Namespace Issues**

```python
# Define namespaces
namespaces = {'ns': 'http://example.com/namespace'}
titles = root.findall('.//ns:title', namespaces)
```

#### 3. **Invalid Characters**

```python
import html

# Escape special characters
safe_text = html.escape(user_input)
```

#### 4. **Large Files**

```python
# Use iterparse for large files
for event, elem in ET.iterparse('large_file.xml'):
    if elem.tag == 'book':
        process(elem)
        elem.clear()  # Free memory
```

---

## Best Practices

- ✅ Always declare XML version and encoding
- ✅ Use meaningful element names
- ✅ Validate against schema
- ✅ Handle errors gracefully
- ✅ Use namespaces for mixed vocabularies
- ✅ Choose attributes vs elements wisely
- ✅ Close all tags properly
- ✅ Escape special characters
- ✅ Use CDATA for code blocks
- ✅ Keep structure simple and flat when possible

---

## Additional Resources

### Tools

- **XMLSpy**: Professional XML editor
- **Oxygen XML**: XML development environment
- **xmllint**: Command-line validator

### Documentation

- [W3C XML](https://www.w3.org/XML/)
- [W3Schools XML](https://www.w3schools.com/xml/)
- [Mozilla XML Guide](https://developer.mozilla.org/en-US/docs/Web/XML)

---

**Happy XML processing! 🚀📄**

