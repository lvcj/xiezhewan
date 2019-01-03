douleMe :: Num a => a -> a 
douleMe x = x + x

douleNumber :: (Num a, Ord a) => a -> a
douleNumber x = (if x > 100 then x else x*2) + 1

boomBangs :: Integral a => [a] -> [[Char]]
boomBangs xs = [
  if x < 10 then "BOOM!"
  else "BANG!"
  | x <- xs, odd x]

luckey :: (Integral a) => a -> String
luckey 7 = "LUCK NUMBER SEVEN"
luckey x = "sorry , youre out of luck, pal"

sayMe :: Integral a => a -> String
sayMe 1 = "One!"  
sayMe 2 = "Two!"  
sayMe 3 = "Three!"  
sayMe 4 = "Four!"  
sayMe 5 = "Five!"  
sayMe x = "Not between 1 and 5"


factorial :: Integral a => a -> a
factorial 0 = 1
factorial n = n * factorial (n - 1)

addVectors :: Num a =>  (a, a) -> (a, a) -> (a, a)
addVectors a b  = (fst a + fst b, snd a + snd b)

head' :: [a] -> a
head' [] = error "fxxk"
head' (x:_) = x


max' :: Ord a => a -> a -> a
max' a b
  | a > b = a
  | otherwise = b

myCompare :: Ord a => a -> a -> Ordering
a `myCompare` b
  | a > b  = GT
  | a == b = EQ
  | otherwise = LT

bmiTell :: (RealFloat a) => a -> a -> String  
bmiTell weight height  
    | bmi <= 18.5 = "You're underweight, you emo, you!"  
    | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"  
    | otherwise   = "You're a whale, congratulations!"  
    where bmi = weight / height ^ 2

initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
  where (f:_) = firstname
        (l:_) = lastname

cylinder :: RealFloat a => a -> a -> a
cylinder r h =
  let sideArea = 2 * pi * r * h
      topArea = pi * (r ^ 2)
  in sideArea + 2 * topArea

-- recursion 递归

maximum' :: Ord a => [a] -> a
maximum' [] = error "maximum of empty list"
maximum' [x] = x
maximum' (x:xs)
  | x > maxTail = x
  | otherwise = maxTail
  where maxTail = maximum' xs

maximumf :: Ord a => [a] -> a
maximumf [] = error "maximum of empty list"
maximumf [x] = x
maximumf (x:xs) = max x (maximumf xs)

replicate' :: (Num i, Ord i) => i -> a ->[a]
replicate' n x
  | n <= 0 = []
  | otherwise = x:(replicate' (n-1) x)

take' :: (Num i, Ord i) => i -> [a] -> [a]
take' n _
  | n <= 0 = []
take' _ [] = []
take' n (x: xs) = x: (take' (n-1) xs)

reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

repeat' :: a -> [a]
repeat' x = x:(repeat' x)

zip' :: [a] -> [b] -> [(a, b)]
zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x, y):zip' xs ys

elem' :: (Eq a) => a -> [a] -> Bool
elem' a [] = False
elem' a (s:sx)
  | a == s = True
  | otherwise = a `elem'` sx

quickSort :: (Ord a) => [a] -> [a]
quickSort [] = []
quickSort (x:xs) =
  let smallSorted = quickSort [a | a <- xs, a <= x]
      biggerSorted = quickSort [a | a <- xs, a > x]
  in smallSorted ++ [x] ++ biggerSorted

quickSort' :: (Ord a) => [a] -> [a]
quickSort' [] = []
quickSort' (x:xs) =
  smallSorted ++ [x] ++ biggerSorted
  where smallSorted = quickSort' [a | a <- xs, a <= x]
        biggerSorted = quickSort' [a | a <- xs, a > x]

stepSum' :: Num a => [a] -> a
stepSum' [] = 1
stepSum' (x:xs) = x * (stepSum' xs)

stepSums :: Num a => [a] -> a
stepSums [] = 0
stepSums (x:xs) = x + (stepSums xs)

-- haskell 的高阶函数，本质上所有的函数都是只有一个参数，多参数是本质上 Haskell 的 function 都是 curried function
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) = 
  let smaller = quicksort [a | a <- xs, a <= x]
      bigger = quicksort [a | a <- xs, a > x]
  in smaller ++ [x] ++ bigger