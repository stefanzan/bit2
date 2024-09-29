# Velocity Benchmark
The Velocity benchmark consists of the examples in the official [Velocity tutorial](https://velocity.apache.org/engine/devel/user-guide.html#what-is-velocity). The benchmark contains 12 Velocity templates, which are all implemented in BIT. We list these templates as follows.

## Template 1
The Velocity template (15 lines of code) is as follows. The BIT implementation can be found at `Velocity1.bit2`, consisting of 20 lines of code.

```velocity
<html>
  <body>
    Hello $customer.Name!
    <table>
    #foreach( $mud in $mudsOnSpecial )
      #if ( $customer.hasPurchased($mud) )
        <tr>
          <td>
            $flogger.getPromo( $mud )
          </td>
        </tr>
      #end
    #end
    </table>
  </body>
</html>
```

This template is a comprehensive example in the Velocity tutorial.

## Template 2
The Velocity template (6 lines of code) is as follows. The BIT implementation can be found at `Velocity2.bit2`, consisting of 7 lines of code.

```velocity
<html>
  <body>
  #set( $foo = "Velocity" )
  Hello $foo World!
  </body>
</html>
```

This template demonstrates the feature of **local assignments**.

## Template 3
The Velocity template (5 lines of code) is as follows. The BIT implementation can be found at `Velocity3.bit2`, consisting of 6 lines of code.

```velocity
<ul>
#foreach( $key in $allProducts.keySet() )
    <li>Key: $key -> Value: $allProducts.get($key)</li>
#end
</ul>
```

This template demonstrates the feature of **loops**.

## Template 4
The Velocity template (5 lines of code) is as follows. The BIT implementation can be found at `Velocity4.bit2`, consisting of 8 lines of code.

```velocity
<table>
#foreach( $customer in $customerList )
    <tr><td>$foreach.count</td><td>$customer.Name</td></tr>
#end
</table>
```

This template demonstrates the feature of **loops**.

## Template 5
The Velocity template (6 lines of code) is as follows. The BIT implementation can be found at `Velocity5.bit2`, consisting of 7 lines of code.

```velocity
#foreach( $customer in $customerList )
    #if( $foreach.first ) There are customer: #end
    $customer.Name #if( $foreach.hasNext ),#end
#else
    Nobody around
#end
```

This template demonstrates the feature of complex **loops**.

## Template 6
The Velocity template (6 lines of code) is as follows. The BIT implementation can be found at `Velocity6.bit2`, consisting of 10 lines of code.

```velocity
#foreach( $customer in $customerList )
    #if( $foreach.count > 5 )
        #break
    #end
    $customer.Name
#end
```

This template demonstrates the feature of **loops** with early stopping.

## Template 7
The Velocity template (7 lines of code) is as follows. The BIT implementation can be found at `Velocity7.bit2`, consisting of 9 lines of code.

```velocity
#set ($foo = "deoxyribonucleic acid")
#set ($bar = "ribonucleic acid")

#if ($foo == $bar)
  In this case it's clear they aren't equivalent. So...
#else
  They are not equivalent and this will be the output.
#end
```

This template demonstrates the feature of **relational and logical operators**.

## Template 8
The Velocity template (9 lines of code) is as follows. The BIT implementation can be found at `Velocity8.bit2`, consisting of 11 lines of code.

```velocity
#if( $foo < 10 )
    **Go North**
#elseif( $foo == 10 )
    **Go East**
#elseif( $bar == 6 )
    **Go South**
#else
    **Go West**
#end
```

This template demonstrates the feature of **conditionals**.

## Template 9
The Velocity template (11 lines of code) is as follows. The BIT implementation can be found at `Velocity9.bit2`, consisting of 16 lines of code.

```velocity
Count down.
#set( $count = 8 )
#parse( "parsefoo.vm" )
All done with dofoo.vm!

-- parsefoo.vm
$count
#set( $count = $count - 1 )
#if( $count > 0 )
    #parse( "parsefoo.vm" )
#else
    All done with parsefoo.vm!
#end
```

This template demonstrates the feature of **template inclusion**. BIT does not support multi-file templates, so we realized it with template calls.

## Template 10
The Velocity template (3 lines of code) is as follows. The BIT implementation can be found at `Velocity10.bit2`, consisting of 12 lines of code.

```velocity
#define( $block )Hello $who#end
#set( $who = 'World!' )
$block
```

This template demonstrates the feature of **block definition**. We realized it with template calls.

## Template 11
The Velocity template (11 lines of code) is as follows. The BIT implementation can be found at `Velocity11.bit2`, consisting of 13 lines of code.

```velocity
#macro( tablerows $color $somelist )
#foreach( $something in $somelist )
    <tr><td bgcolor=$color>$something</td></tr>
#end
#end

#set( $greatlakes = ["Superior","Michigan","Huron","Erie","Ontario"] )
#set( $color = "blue" )
<table>
    #tablerows( $color $greatlakes )
</table>
```

This template demonstrates the feature of **macro definition**. We realized it with template calls.

## Template 12
The Velocity template (5 lines of code) is as follows. The BIT implementation can be found at `Velocity12.bit2`, consisting of 8 lines of code.

```velocity
#[[
#foreach ($woogie in $boogie)
  nothing will happen to $woogie
#end
]]#
```

This template demonstrates the feature of **unparsed text** (verbose blocks).
