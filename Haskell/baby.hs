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
