# Perl

## Introduction

## 📘 What is Perl?

**Perl** (Practical Extraction and Report Language) is a high-level, general-purpose, interpreted, dynamic programming language. Created by Larry Wall in 1987, Perl is famous for its text processing capabilities, system administration prowess, and the philosophy **"There's More Than One Way To Do It" (TIMTOWTDI)**.

### **History & Creator**

- **Created by**: Larry Wall
- **First Release**: December 18, 1987
- **Current Version**: Perl 5.38 (2023)
- **Raku (formerly Perl 6)**: Separate language (2015)
- **Motto**: "The Swiss Army Chainsaw of Programming"
- **Philosophy**: TIMTOWTDI (Tim Toady)
- **License**: GNU GPL or Artistic License

### **Why Perl?**

Larry Wall created Perl to make **report processing easier** at NASA, combining the best features of:
- **C** - Performance
- **sed** - Text processing
- **awk** - Pattern matching
- **shell** - System administration

---

## 🎯 Key Features

### 1. **Unmatched Text Processing**
- **Best regex engine** in any language (until recently)
- Built for parsing and transforming text
- One-liners extremely powerful
- String manipulation excellence

```perl
# Extract emails from text
my $text = "Contact: john@example.com or jane@test.org";
my @emails = $text =~ /(\w+\@\w+\.\w+)/g;
```

### 2. **CPAN - Comprehensive Perl Archive Network**
- **200,000+ modules**
- "There's a module for that!"
- One of the oldest package repositories (1995)
- Solved problems for decades

### 3. **System Administration Power**
- **Unix/Linux admin** standard
- File manipulation excellence
- Process management
- Network programming

### 4. **Bioinformatics Standard**
- **BioPerl** - Industry standard
- Sequence analysis
- Genomics pipelines
- Scientific text processing

### 5. **Report Generation**
- Originally designed for reports
- Format statements
- Data extraction
- Log analysis

### 6. **CGI Web Development** (Historical)
- **Early web's backbone**
- CGI scripts standard
- Still running on millions of servers
- Legacy but important

### 7. **One-Liners**
```bash
# Replace text in all files
perl -pi -e 's/foo/bar/g' *.txt

# Sum numbers in a file
perl -lane '$sum += $F[0]; END {print $sum}' data.txt
```

### 8. **Cross-Platform**
- Runs everywhere
- Windows, Linux, macOS, Unix
- Consistent behavior
- Portable scripts

---

## 💡 What is Perl Used For?

### 1. **📜 System Administration** (Primary Use)

**Why Sysadmins Love Perl:**
- Text log parsing
- File manipulation
- Process management
- Network administration
- Automation scripts

```perl
# Parse Apache logs
while (<LOGFILE>) {
    /(\d+\.\d+\.\d+\.\d+).*\[(.+?)\].*"GET (.+?) HTTP/ and
    print "IP: $1, Time: $2, Page: $3\n";
}
```

**Common Tasks:**
- Log rotation and analysis
- Backup scripts
- Configuration management
- Server monitoring
- Data migration

### 2. **🧬 Bioinformatics** (Major Use Case)

**BioPerl - The Standard:**
- DNA/RNA sequence analysis
- Protein structure prediction
- Genome assembly
- Phylogenetic analysis
- Database interfacing (GenBank, EMBL)

**Organizations:**
- **NIH** - Genomics
- **Wellcome Sanger Institute**
- Research universities worldwide
- Pharmaceutical companies

### 3. **🌐 Web Development** (Legacy but Active)

**Historical Dominance:**
- **CGI scripts** (1990s-2000s)
- Still powers millions of sites
- Craigslist (partially Perl)
- BBC websites (backend)

**Modern Frameworks:**
- **Dancer** - Lightweight web framework
- **Mojolicious** - Modern  Perl web
- **Catalyst** - MVC framework

### 4. **📊 Data Processing & ETL**

- Log file analysis
- Data transformation
- CSV/XML/JSON parsing
- Database ETL pipelines
- Report generation

### 5. **🔍 Text Mining & Analysis**

- Natural language processing
- Document parsing
- Information extraction
- Web scraping
- Content analysis

### 6. **🧪 Testing & QA**

- **Test::More** - Testing framework
- Automated testing
- Quality assurance
- Regression testing

### 7. **🏢 Legacy Enterprise Systems**

Many large corporations have:
- Massive Perl codebases
- Financial systems
- Inventory management
- Billing systems
- Must maintain for years

---

## ⚖️ Advantages of Perl

### ✅ **1. Text Processing King**
```perl
# Complex regex in one line
$text =~ s/(\w+)\s+(?=\1\b)//g;  # Remove duplicate words
```
- Best regex historically
- String manipulation power
- Pattern matching excellence
- Built for text

### ✅ **2. CPAN Ecosystem**
- 200,000+ modules
- Solution exists for almost everything
- 30+ years of accumulated knowledge
- "There's a module for that!"

### ✅ **3. One-Liner Power**
```bash
# Find files modified today
perl -e 'print "$_\n" for grep { -M < 1 } glob "*"'
```
- Replace sed/awk/grep
- Powerful command-line tool
- Quick scripts

### ✅ **4. System Admin Excellence**
- File manipulation
- Process control
- Network sockets
- System interactions
- Cross-platform

### ✅ **5. Mature & Stable**
- 35+ years of development
- Battle-tested
- Predictable behavior
- Won't break your code

### ✅ **6. Flexible Syntax**
- TIMTOWTDI philosophy
- Write code your way
- Expressive
- Concise when needed

### ✅ **7. Great Documentation**
- `perldoc` built-in
- Comprehensive man pages
- CPAN module docs
- Large community knowledge

### ✅ **8. BioPerl Standard**
- Genomics industry standard
- Huge scientific community
- Critical for bioinformatics
- Well-maintained

### ✅ **9. Backwards Compatible**
- Code from 1990s still runs
- Long-term stability
- Legacy support
- Migration safety

### ✅ **10. Cross-Platform**
- Runs everywhere
- Same code, any OS
- Portable
- Consistent

---

## ⚠️ Disadvantages of Perl

### ❌ **1. "Write-Only" Code**
```perl
# Famous Perl "line noise"
@p{split//,$_}=1..~~1for@F;print for sort grep$p{$_},keys%p;
```
- Can be extremely cryptic
- Hard to read others' code
- Maintainability issues
- "Perl golf" makes it worse

### ❌ **2. Declining Popularity**
```
Perl usage declining since ~2010:
- Lost web to Python/Node.js
- Lost scripting to Python
- Lost new projects to modern languages
```

### ❌ **3. Raku (Perl 6) Confusion**
- Perl 6 became separate language (Raku)
- Community split
- Confusion about versions
- Perl 5 vs Raku unclear to newcomers

### ❌ **4. Modern Features Missing**
- No built-in async/await
-Limited OOP (Moose helps)
- Type system weak
- Feels dated vs modern languages

### ❌ **5. Syntax Quirks**
```perl
my @array = (1, 2, 3);    # Array
my $arrayref = [1, 2, 3]; # Array reference
my %hash = (a => 1);      # Hash
my $hashref = {a => 1};   # Hash reference
# Confusing for beginners!
```

### ❌ **6. Sigils Everywhere**
```perl
$scalar, @array, %hash, &function, *typeglob
# $ @ % & * can confuse
```

### ❌ **7. Global Variables**
- `$_`, `$@`, `$!`, `$$`, `$<`, etc.
- Cryptic special variables
- Hard to remember
- Error-prone

### ❌ **8. Object System**
- No native classes (until recently)
- Blessed references confusing
- Moose/Moo needed for modern OOP
- Inheritance tricky

### ❌ **9. Package Management**
- CPAN installation can fail
- Dependency hell
- cpanm helps but not perfect
- System integration issues

### ❌ **10. Smaller Job Market**
- Declining demand
- Mostly legacy maintenance
- Fewer new projects
- Lower salaries than Python/JS

---

## 🆚 Perl vs Other Languages

### Perl vs Python
| Feature | Perl | Python |
|---------|------|--------|
| **Text Processing** | ⚡ Best regex | ✅ Good (re module) |
| **Readability** | ⚠️ Can be cryptic | ⚡ Very readable |
| **Ecosystem** | ✅ CPAN (mature) | ⚡ PyPI (larger) |
| **Popularity** | ⚠️ Declining | ⚡ Rising |
| **Use Case** | Text, sysadmin, bio | General-purpose |
| **Job Market** | ⚠️ Limited | ⚡ Strong |

### Perl vs Ruby
| Feature | Perl | Ruby |
|---------|------|------|
| **Philosophy** | TIMTOWTDI | One way (Pythonic) |
| **Web** | ⚠️ Legacy CGI | ✅ Rails |
| **Syntax** | ⚠️ Sigils, quirky | ✅ Clean |
| **Speed** | ✅ Faster | ⚠️ Slower |
| **Popularity** | ⚠️ Declining | ⚠️ Stable/declining |

### Perl vs Bash/Shell
| Feature | Perl | Bash |
|---------|------|------|
| **Text Processing** | ⚡ Far superior | ⚠️ Limited |
| **Cross-Platform** | ⚡ Excellent | ⚠️ Unix-centric |
| **Complexity** | ✅ Handles complex logic | ⚠️ Gets messy |
| **System Calls** | ✅ Easy | ⚡ Native |
| **Use Case** | Complex scripts | Simple automation |

---

## 🚀 Perl in Production

### **Organizations Still Using Perl:**

**Bioinformatics:**
- **NIH** - Genomics
- **EMBL** - European bioinformatics
- **Major pharma companies**

**Web (Legacy):**
- **Amazon** (parts of backend)
- **BBC** - Content management
- **Craigslist** - Classifieds
- **Booking.com** - Some services

**Finance:**
- **Bloomberg** - Data processing
- **Morgan Stanley** - Legacy systems
- Trading platforms

**Tech:**
- **Ticketmaster** - Backend systems
- **DuckDuckGo** - Search crawler
- **LiveJournal** - Social platform

---

## 🎓 Who Should Learn Perl?

### ✅ **Perfect For:**
- **Bioinformaticians** (BioPerl essential)
- **Linux/Unix sysadmins** (legacy systems)
- **Text processing specialists**
- **Legacy code maintainers**
- **DevOps with Perl systems**
- **One-liner power users**

### 💡 **Consider Other Languages If:**
- **New to programming** (→ Python)
- **Web development** (→ JavaScript, Python)
- **Data science** (→ Python, R)
- **Mobile apps** (→ Kotlin, Swift)
- **Modern backend** (→ Go, Rust, Java)

---

## 📚 Learning Resources

### Official
- [Perl.org](https://www.perl.org/)
- [Learn Perl](https://learn.perl.org/)
- [CPAN](https://metacpan.org/)

### Books
- "Learning Perl" (The Llama Book)
- "Programming Perl" (The Camel Book)
- "Modern Perl" - chromatic (Free online)

### Tools
- **perlbrew** - Version management
- **cpanm** - Module installer
- **Perl::Critic** - Code quality
- **Padre** - Perl IDE

---

## 🌟 Historic Impact

### **Perl's Legacy:**
1. **Early Web** - Powered CGI revolution
2. **Regex** - Influenced all modern languages
3. **CPAN** - First major package repository
4. **Bioinformatics** - Enabled genomics revolution
5. **System Admin** - Standard tool for decades

### **"Perl Saved the Human Genome Project"**
- BioPerl enabled genomic analysis
- Processing billions of base pairs
- Standard for sequence analysis

---

## 🔮 Future of Perl

### **Reality Check**
- ⚠️ **Declining** for general use
- ✅ **Stable** in bioinformatics
- ✅ **Maintained** for legacy
- ⚠️ Fewer new projects

### **Will Survive Because:**
- Massive existing codebase
- Bioinformatics dependency
- Text processing still best
- Legacy systems critical

### **Outlook**: **🟡 Maintain, Don't Start New**
- Learn if you must maintain Perl
- Use Python for new projects
- Exception: Bioinformatics

---

## ✅ Summary

### **Best For:**
- 🏆 Text/log processing
- 🏆 Bioinformatics (BioPerl)
- 🏆 Legacy system maintenance
- 🏆 Quick one-liners
- 🏆 Sysadmin automation

### **When to Learn Perl:**
- ✅ Working in bioinformatics
- ✅ Maintaining legacy systems
- ✅ Need advanced regex
- ✅ Linux/Unix administration
- ✅ Text processing specialist

### **When to Choose Alternatives:**
- ❌ Starting new projects → Python
- ❌ Web development → JavaScript, Python
- ❌ Data science → Python, R
- ❌ Learning first language → Python
- ❌ Modern backend → Go, Rust, Java

---

## 📖 Next Steps

If you need Perl:
1. **User Guide** (section below) - Installation & syntax
2. **[Text Processing Guide](./text-processing.md)** - Regex mastery
3. **[CPAN Guide](./cpan-guide.md)** - Module ecosystem
4. **[Code Examples](./examples/)** - Practical scripts

---

**🐪 "Perl: The Swiss Army Chainsaw"**

*Last Updated: January 15, 2026*

---

## User Guide

This comprehensive guide covers everything you need to start programming in Perl for text processing, system administration, and bioinformatics.

---

## 📦 Installation Guide

### Windows Installation

#### Method 1: Strawberry Perl (Recommended)

1. Download from [StrawberryPerl.com](http://strawberryperl.com/)
2. Run installer (includes CPAN and build tools)
3. Verify:

```powershell
perl -v
# This is perl 5, version 38...
```

#### Method 2: ActivePerl

1. Download from [ActiveState.com](https://www.activestate.com/products/perl/)
2. Install
3. Verify: `perl -v`

---

### macOS Installation

macOS comes with Perl pre-installed!

```bash
# Check version
perl -v

# Update with perlbrew (optional)
curl -L https://install.perlbrew.pl | bash
perlbrew init
perlbrew install perl-5.38.0
perlbrew switch perl-5.38.0
```

---

### Linux Installation

Most Linux distributions include Perl.

```bash
# Check version
perl -v

# Ubuntu/Debian (if needed)
sudo apt install perl

# Fedora
sudo dnf install perl

# Arch
sudo pacman -S perl
```

#### Using perlbrew (Version Manager)

```bash
# Install perlbrew
curl -L https://install.perlbrew.pl | bash
echo 'source ~/perl5/perlbrew/etc/bashrc' >> ~/.bashrc
source ~/.bashrc

# Install Perl version
perlbrew install perl-5.38.0
perlbrew switch perl-5.38.0
```

---

### Installing CPAN Modules

```bash
# Using cpan
cpan Module::Name

# Using cpanm (cpanminus - easier)
cpan App::cpanminus
cpanm Module::Name

# Install specific modules
cpanm DBI
cpanm JSON
cpanm LWP::UserAgent
```

---

## 🎓 Perl Syntax Fundamentals

### 1. Shebang and Running Scripts

```perl
#!/usr/bin/perl
use strict;
use warnings;
use v5.10;  # Enables features like 'say'

say "Hello, Perl!";
```

```bash
# Make executable (Unix/Linux)
chmod +x script.pl
./script.pl

# Run directly
perl script.pl
```

---

### 2. Variables and Sigils

```perl
# Scalar ($) - single value
my $name = "Alice";
my $age = 25;
my $price = 99.99;
my $ref = \$name;  # Reference

# Array (@) - ordered list
my @numbers = (1, 2, 3, 4, 5);
my @fruits = ('apple', 'banana', 'orange');

# Hash (%) - key-value pairs
my %person = (
    name => "Bob",
    age  => 30,
    city => "NYC"
);

# Accessing
say $numbers[0];     # 1 (scalar context)
say $person{name};   # "Bob" (scalar context)
say @numbers;        # All elements (list context)
say keys %person;    # All keys
```

**Important**: The sigil changes based on what you're accessing, not the variable type!

```perl
my @array = (1, 2, 3);
$array[0] = 10;  # $ because accessing single element
@array[1, 2];    # @ because accessing multiple elements
```

---

### 3. Context (Scalar vs List)

```perl
my @numbers = (1, 2, 3, 4, 5);

# Scalar context - returns count
my $count = @numbers;  # 5

# List context - returns elements
my @copy = @numbers;   # (1, 2, 3, 4, 5)

# Force scalar context
my $last = scalar reverse @numbers;  # 5 (not array!)
```

---

### 4. Strings

```perl
# Single quotes - literal
my $single = 'Hello $name';  # Literal $name

# Double quotes - interpolation
my $name = "Alice";
my $double = "Hello $name";  # "Hello Alice"

# Here documents
my $text = <<'END';
This is a
multiline string
END

# With interpolation
my $interpolated = <<"END";
Name: $name
Age: $age
END

# String operations
uc("hello")        # "HELLO"
lc("HELLO")        # "hello"
ucfirst("hello")   # "Hello"
length("hello")    # 5
reverse("hello")   # "olleh"
substr("hello", 1, 3)  # "ell"

# Concatenation
"Hello" . " " . "World"  # "Hello World"

# Repetition
"*" x 10  # "**********"
```

---

### 5. Numbers

```perl
# Integers
my $int = 42;
my $hex = 0xFF;     # 255
my $oct = 0755;     # 493
my $bin = 0b1010;   # 10

# Floats
my $float = 3.14;
my $scientific = 1.5e-10;

# Arithmetic
my $sum = 10 + 5;
my $diff = 10 - 5;
my $product = 10 * 5;
my $quotient = 10 / 5;
my $remainder = 10 % 3;
my $power = 10 ** 2;

# Auto-increment
my $x = 5;
$x++;  # 6
$x--;  # 5
```

---

### 6. Arrays

```perl
# Create array
my @numbers = (1, 2, 3, 4, 5);
my @empty = ();

# Access
$numbers[0]      # 1 (first element)
$numbers[-1]     # 5 (last element)
$numbers[-2]     # 4 (second from end)

# Modify
$numbers[0] = 10;
$numbers[5] = 6;  # Extends array

# Add/remove
push @numbers, 7;      # Add to end
my $last = pop @numbers;    # Remove from end
unshift @numbers, 0;   # Add to beginning
my $first = shift @numbers; # Remove from beginning

# Slice
my @slice = @numbers[1..3];  # Elements 1, 2, 3

# Length
my $length = @numbers;       # Scalar context
my $size = scalar @numbers;  # Explicit

# Iterate
for my $num (@numbers) {
    say $num;
}

foreach my $item (@array) {
    # Do something
}
```

---

### 7. Hashes

```perl
# Create hash
my %person = (
    name => "Alice",
    age  => 25,
    city => "NYC"
);

# Alternative syntax
my %config = (
    "host", "localhost",
    "port", 8080
);

# Access
$person{name}      # "Alice"
$person{age}       # 25

# Add/modify
$person{job} = "Engineer";
$person{age} = 26;

# Delete
delete $person{city};

# Check existence
if (exists $person{name}) {
    say "Name exists";
}

# Keys and values
my @keys = keys %person;
my @values = values %person;

# Iterate
while (my ($key, $value) = each %person) {
    say "$key: $value";
}

# Or with keys
for my $key (keys %person) {
    say "$key: $person{$key}";
}
```

---

### 8. References

```perl
# Scalar reference
my $name = "Alice";
my $ref = \$name;
say $$ref;  # "Alice" (dereference)

# Array reference
my @array = (1, 2, 3);
my $aref = \@array;
say $aref->[0];  # 1
say @$aref;      # (1, 2, 3)

# Anonymous array
my $fruits = ['apple', 'banana', 'orange'];
say $fruits->[0];  # "apple"

# Hash reference
my %hash = (a => 1, b => 2);
my $href = \%hash;
say $href->{a};  # 1
say %$href;      # (a, 1, b, 2)

# Anonymous hash
my $person = {
    name => "Bob",
    age  => 30
};
say $person->{name};  # "Bob"

# Complex structures
my $data = {
    users => [
        { name => "Alice", age => 25 },
        { name => "Bob", age => 30 }
    ],
    count => 2
};

say $data->{users}[0]{name};  # "Alice"
```

---

### 9. Control Structures

#### If-Unless

```perl
my $age = 25;

# If-else
if ($age >= 18) {
    say "Adult";
} elsif ($age >= 13) {
    say "Teen";
} else {
    say "Child";
}

# Postfix if
say "Adult" if $age >= 18;

# Unless (opposite of if)
unless ($age < 18) {
    say "Not a minor";
}

# Postfix unless
say "Adult" unless $age < 18;

# Ternary
my $status = $age >= 18 ? "Adult" : "Minor";
```

#### Loops

```perl
# For loop
for (my $i = 0; $i < 5; $i++) {
    say $i;
}

# Foreach
my @fruits = ('apple', 'banana', 'orange');
foreach my $fruit (@fruits) {
    say $fruit;
}

# Foreach with range
foreach my $num (1..10) {
    say $num;
}

# While
my $count = 0;
while ($count < 5) {
    say $count;
    $count++;
}

# Until (opposite of while)
$count = 0;
until ($count >= 5) {
    say $count;
    $count++;
}

# Postfix foreach
say $_ for @fruits;

# Do-while
$count = 0;
do {
    say $count;
    $count++;
} while ($count < 5);

# Loop control
next;     # Continue
last;     # Break
redo;     # Re-execute current iteration
```

---

### 10. Subroutines

```perl
# Define subroutine
sub greet {
    my ($name) = @_;
    return "Hello, $name!";
}

# Call
my $msg = greet("Alice");

# Multiple parameters
sub add {
    my ($a, $b) = @_;
    return $a + $b;
}

say add(5, 3);  # 8

# Default parameters
sub greet_default {
    my $name = shift || "World";
    return "Hello, $name!";
}

# Variable arguments
sub sum {
    my $total = 0;
    foreach my $num (@_) {
        $total += $num;
    }
    return $total;
}

say sum(1, 2, 3, 4, 5);  # 15

# Named parameters (using hash)
sub create_user {
    my %params = @_;
    return "User: $params{name}, Age: $params{age}";
}

say create_user(name => "Bob", age => 30);

# Return multiple values
sub min_max {
    my @numbers = @_;
    my $min = (sort { $a <=> $b } @numbers)[0];
    my $max = (sort { $b <=> $a } @numbers)[0];
    return ($min, $max);
}

my ($min, $max) = min_max(5, 2, 9, 1, 7);
```

---

### 11. Regular Expressions (Perl's Power!)

```perl
# Match operator (=~)
my $text = "Hello, World!";

if ($text =~ /World/) {
    say "Found 'World'";
}

# Case-insensitive
if ($text =~ /world/i) {
    say "Found (case-insensitive)";
}

# Capture groups
my $email = "Contact: john@example.com";
if ($email =~ /(\w+)@(\w+\.\w+)/) {
    say "Username: $1";  # john
    say "Domain: $2";    # example.com
}

# Global match
my @words = $text =~ /\w+/g;
say "@words";  # Hello World

# Substitution
my $str = "hello world";
$str =~ s/world/Perl/;  # "hello Perl"
$str =~ s/hello/Hi/gi;  # Global, case-insensitive

# Transliteration
$str =~ tr/a-z/A-Z/;  # Uppercase

# Common patterns
/\d+/       # Digits
/\w+/       # Word characters
/\s+/       # Whitespace
/./         # Any character
/^start/    # Start of string
/end$/      # End of string
/[abc]/     # Character class
/(foo|bar)/ # Alternation
```

---

### 12. File I/O

```perl
# Open for read
open(my $fh, '<', 'file.txt') or die "Cannot open: $!";
while (my $line = <$fh>) {
    chomp $line;  # Remove newline
    say $line
}
close $fh;

# Open for write
open(my $out, '>', 'output.txt') or die "Cannot write: $!";
print $out "Hello, World!\n";
close $out;

# Append
open(my $app, '>>', 'file.txt') or die "Cannot append: $!";
print $app "New line\n";
close $app;

# Slurp entire file
open(my $in, '<', 'file.txt') or die $!;
my $content = do { local $/; <$in> };  # Slurp mode
close $in;

# One-liner read
my @lines = do {
    open my $fh, '<', 'file.txt' or die $!;
    <$fh>;
};

# File tests
-e 'file.txt'  # Exists
-f 'file.txt'  # Is file
-d 'dir'       # Is directory
-r 'file.txt'  # Readable
-w 'file.txt'  # Writable
-s 'file.txt'  # Size in bytes
```

---

### 13. Modules and Packages

```perl
# Define module (MyModule.pm)
package MyModule;
use strict;
use warnings;

sub greet {
    my ($name) = @_;
    return "Hello, $name!";
}

1;  # Must return true

# Use module
use MyModule;
say MyModule::greet("Alice");

# Export functions
package MyMath;
use Exporter 'import';
our @EXPORT_OK = qw(add multiply);

sub add { $_[0] + $_[1] }
sub multiply { $_[0] * $_[1] }

1;

# In another file
use MyMath qw(add multiply);
say add(5, 3);
```

---

### 14. CPAN Modules (Common)

```perl
# JSON
use JSON;
my $json = encode_json({ name => "Alice", age => 25 });
my $data = decode_json($json);

# LWP (Web requests)
use LWP::Simple;
my $content = get('http://example.com');

# DBI (Database)
use DBI;
my $dbh = DBI->connect("dbi:SQLite:dbname=test.db");

# DateTime
use DateTime;
my $dt = DateTime->now;
say $dt->ymd;  # 2026-01-15

# File::Slurp
use File::Slurp;
my $content = read_file('file.txt');
write_file('out.txt', $content);
```

---

### 15. Special Variables

```perl
$_     # Default variable
$!     # Error message
$?     # Exit status
$$     # Process ID
$<     # Real user ID
$0     # Program name
@ARGV  # Command-line arguments
%ENV   # Environment variables
@INC   # Module search paths
$"     # List separator (default " ")
$/     # Input record separator (default "\n")
$\     # Output record separator

# Examples
for (1..5) {
    say $_;  # Prints 1, 2, 3, 4, 5
}

say "Error: $!" if !open my $fh, '<', 'missing.txt';
say "Process ID: $$";
say "Script name: $0";
```

---

## 🛠️ Development Tools

### Editors and IDEs

**VS Code**:
- Install "Perl" extension
- Syntax highlighting
- Basic completion

**Perl IDE (EPIC)**:
- Eclipse plugin
- Debugging support

**Vim**:
- Built-in Perl syntax
- perl-support plugin

---

### One-Liners (Perl's Strength!)

```bash
# Replace in files
perl -pi -e 's/foo/bar/g' *.txt

# Sum numbers
perl -lane '$sum += $F[0]; END {print $sum}' data.txt

# Print lines matching pattern
perl -ne 'print if /pattern/' file.txt

# Print line numbers
perl -ne 'print "$.: $_"' file.txt

# Delete blank lines
perl -ne 'print unless /^$/' file.txt

# In-place edit (backup with .bak)
perl -pi.bak -e 's/old/new/g' file.txt
```

---

## ✅ Best Practices

1. **Always use `strict` and `warnings`**
2. **Use `my` for all variables**
3. **Use meaningful variable names**
4. **Use `or die` for error handling**
5. **Use `chomp` after reading lines**
6. **Comment your regex patterns**
7. **Use modules from CPAN**
8. **Use three-argument `open`**

```perl
use strict;
use warnings;
use v5.10;

my $filename = 'data.txt';
open(my $fh, '<', $filename) or die "Can't open $filename: $!";
```

---

## 📚 Next Steps

1. **Advanced regex** - Lookahead, lookbehind
2. **OOP with Moose** - Modern Perl OOP
3. **DBI** - Database programming
4. **Web frameworks** - Dancer, Mojolicious
5. **BioPerl** - Bioinformatics

---

## 📖 Resources

- [Perldoc.perl.org](https://perldoc.perl.org/)
- [Learn Perl](https://learn.perl.org/)
- [Modern Perl Book](http://modernperlbooks.com/)

---

**🐪 Happy Perl coding!**

*Last Updated: January 15, 2026*

