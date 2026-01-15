#!/usr/bin/perl
use strict;
use warnings;
use v5.10;  # Enables 'say' function

say "=== Perl Basics ===\n";

# 1. Hello World
say "Hello, Perl!";

# 2. Variables (scalars, arrays, hashes)
my $name = "Alice";       # Scalar ($ sigil)
my $age = 25;
my $height = 5.7;

say "\nName: $name, Age: $age";

# 3. Arrays (@ sigil)
my @numbers = (1, 2, 3, 4, 5);
say "\nArray: @numbers";
say "First element: $numbers[0]";
say "Last element: $numbers[-1]";

# Add elements
push @numbers, 6, 7;
say "After push: @numbers";

# Remove last element
my $last = pop @numbers;
say "Popped: $last, Array now: @numbers";

# 4. Hashes (% sigil) - like dictionaries
my %person = (
    name => "Bob",
    age  => 30,
    job  => "Engineer"
);

say "\nPerson name: $person{name}";
say "Person job: $person{job}";

# Add new key
$person{city} = "New York";

# Iterate hash
say "\nPerson details:";
while (my ($key, $value) = each %person) {
    say "  $key: $value";
}

# 5. String operations
my $greeting = "Hello, Perl!";
say "\nOriginal: $greeting";
say "Uppercase: " . uc($greeting);
say "Lowercase: " . lc($greeting);
say "Length: " . length($greeting);

# 6. String interpolation
my $msg = "Age: $age, Name: $name";
say "\n$msg";

# 7. Conditionals
my $number = 42;

if ($number > 0) {
    say "\n$number is positive";
} elsif ($number < 0) {
    say "$number is negative";
} else {
    say "$number is zero";
}

# Postfix if (Perl style!)
say "Even!" if $number % 2 == 0;

# 8. Unless (opposite of if)
my $ready = 0;
say "Not ready yet" unless $ready;

# 9. For loops
say "\nCounting 1-5:";
for my $i (1..5) {
    say "  $i";
}

# 10. Foreach (same as for in Perl)
say "\nNumbers squared:";
foreach my $num (@numbers) {
    say "  $num ^ 2 = " . ($num ** 2);
}

# 11. While loop
say "\nCountdown:";
my $count = 5;
while ($count > 0) {
    say "  $count";
    $count--;
}

# 12. Subroutines (functions)
sub add {
    my ($a, $b) = @_;  # @_ contains arguments
    return $a + $b;
}

sub multiply {
    my ($a, $b) = @_;
    $a * $b;  # Last expression is returned
}

say "\n5 + 3 = " . add(5, 3);
say "5 * 3 = " . multiply(5, 3);

# 13. Regular expressions (Perl's strength!)
my $text = "Contact: john@example.com or jane@test.org";

# Match
if ($text =~ /john/) {
    say "\nFound 'john' in text";
}

# Extract emails
my @emails = $text =~ /(\w+\@\w+\.\w+)/g;
say "Emails found: @emails";

# Replace
my $new_text = $text;
$new_text =~ s/email/address/g;
say "After replacement: $new_text";

# 14. Split and join
my $csv = "apple,banana,orange,grape";
my @fruits = split /,/, $csv;
say "\nFruits: @fruits";

my $joined = join " | ", @fruits;
say "Joined: $joined";

# 15. File I/O
my $filename = "test.txt";

# Write
open(my $fh, '>', $filename) or die "Cannot write: $!";
print $fh "Hello from Perl!\n";
print $fh "Line 2\n";
close $fh;

# Read
open($fh, '<', $filename) or die "Cannot read: $!";
say "\nFile contents:";
while (my $line = <$fh>) {
    chomp $line;  # Remove newline
    say "  $line";
}
close $fh;

# 16. Array operations
my @nums = (5, 2, 9, 1, 7);
my @sorted = sort { $a <=> $b } @nums;
say "\nSorted numerically: @sorted";

my @reversed = reverse @sorted;
say "Reversed: @reversed";

# Grep (filter)
my @evens = grep { $_ % 2 == 0 } @nums;
say "Even numbers: @evens";

# Map (transform)
my @doubled = map { $_ * 2 } @nums;
say "Doubled: @doubled";

# 17. Special variables
say "\n\$_ (default variable)";
for (1..3) {
    say "  Value: $_";  # $_ is implicit
}

# 18. Hash operations
my %scores = (
    Alice => 95,
    Bob   => 87,
    Charlie => 92
);

say "\nScores:";
for my $student (sort keys %scores) {
    say "  $student: $scores{$student}";
}

# 19. References (like pointers)
my $array_ref = \@numbers;
my $hash_ref = \%person;

say "\nArray via reference: @$array_ref";
say "Hash name via reference: $hash_ref->{name}";

# Anonymous arrayand hash refs
my $fruits_ref = ['apple', 'banana', 'orange'];
my $config_ref = { host => 'localhost', port => 8080 };

say "First fruit: $fruits_ref->[0]";
say "Config host: $config_ref->{host}";

# 20. Factorial (recursive)
sub factorial {
    my ($n) = @_;
    return 1 if $n <= 1;
    return $n * factorial($n - 1);
}

say "\n5! = " . factorial(5);

# 21. Die and eval (error handling)
eval {
    my $result = 10 / 0;  # Division by zero
};
if ($@) {
    say "\nCaught error: $@";
}

# 22. Here documents
my $sql = <<'SQL';
SELECT * FROM users
WHERE age > 18
  AND active = 1
SQL

say "\nSQL Query:";
say $sql;

# 23. Postfix foreach (Perl style!)
say "\n$_" for qw(one two three four five);

# 24. Unless postfix
my $debug = 0;
say "Debug mode OFF" unless $debug;

# 25. ternary operator
my $status = ($age >= 18) ? "Adult" : "Minor";
say "\nStatus: $status";

# Cleanup
unlink $filename;

say "\n=== Perl Basics Complete ===";
